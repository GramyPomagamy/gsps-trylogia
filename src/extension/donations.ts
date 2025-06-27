import needle, { type NeedleResponse } from "needle";
import { get } from "./util/nodecg";
import { ReadDonations } from "src/types/generated/readDonations";
import request from "request";
import { formatMoney } from "./util/format-money";

let cookies: NeedleResponse["cookies"];
let isFirstLogin = true;
const refreshTime = 10 * 1000; // Odśwież donacje co 10 sekund.
const nodecg = get();

const readDonationsReplicant = nodecg.Replicant("readDonations");
const totalReplicant = nodecg.Replicant("total");
const config = nodecg.bundleConfig.tracker;
const rootURL = config.rootURL;
const eventID = config.eventID;
const LOGIN_URL = `${rootURL}/admin/login/`;
const TOTAL_URL = `${rootURL}/${eventID}?json`;

async function loginToTracker(): Promise<void> {
  if (isFirstLogin) nodecg.log.info(`Loguję się jako ${config.username}`);
  else nodecg.log.info(`Odświeżam sesję jako ${config.username}`);

  try {
    const resp1 = await needle("get", LOGIN_URL);
    if (resp1.statusCode !== 200) {
      throw new Error("Brak dostępu do strony logowania trackera");
    }

    const resp2 = await needle(
      "post",
      LOGIN_URL,
      {
        username: config.username,
        password: config.password,
        csrfmiddlewaretoken: resp1.cookies
          ? resp1.cookies["csrftoken"]
          : undefined,
      },
      {
        cookies: resp1.cookies,
        headers: {
          referer: LOGIN_URL,
        },
      }
    );

    if (
      resp2.statusCode !== 302 ||
      (resp2.cookies && !resp2.cookies["tracker_session"])
    ) {
      throw new Error(
        "Zalogowanie się nie powiodło, czy użytkownik/hasło są poprawne?"
      );
    }

    cookies = resp2.cookies;

    if (isFirstLogin) {
      isFirstLogin = false;
      nodecg.log.info(`Zalogowano pomyślnie jako ${config.username}`);
    } else {
      nodecg.log.info(`Odświeżono sesję jako ${config.username}`);
    }

    setTimeout(loginToTracker, 90 * 60 * 1000);
  } catch (err) {
    nodecg.log.warn("Błąd przy logowaniu! ", err);
    if (!isFirstLogin) {
      setTimeout(loginToTracker, 60 * 1000);
    } else {
      throw new Error("Nie udało się zalogować do trackera.");
    }
  }
}

async function getRecentlyReadDonations() {
  try {
    const resp = await needle(
      "get",
      `${rootURL}/search?event=${config.eventID}&type=donation&readstate=READ`,
      { cookies: cookies }
    );

    const recentlyReadDonations: ReadDonations = (resp.body as Array<any>)
      .slice(0, 25)
      .map((rawDono) => {
        return {
          id: rawDono["pk"],
          name:
            rawDono.fields["requestedvisibility"] === "ALIAS"
              ? rawDono.fields["requestedalias"]
              : "Anonim",
          amount: parseInt(parseFloat(rawDono.fields["amount"]).toFixed(0)),
        };
      });

    readDonationsReplicant.value = recentlyReadDonations;
  } catch (err) {
    nodecg.log.warn("Błąd przy otrzymywaniu przeczytanych donacji: ", err);
  }
}

/**
 * Updates the "total" replicant with the latest value from the GDQ Tracker API.
 * @returns {Promise} - A promise.
 */
function updateTotal() {
  return new Promise((resolve, reject) => {
    request(TOTAL_URL, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let stats;
        try {
          stats = JSON.parse(body);
        } catch (e) {
          nodecg.log.error(
            "Could not parse total, response not valid JSON:\n\t",
            body
          );
          return;
        }

        const freshTotal = parseFloat(stats.agg.total_amount || 0);

        if (freshTotal === totalReplicant.value!.raw) {
          resolve(false);
        } else {
          totalReplicant.value = {
            raw: freshTotal,
            formatted: formatMoney(freshTotal),
          };
          resolve(true);
        }
      } else {
        let msg = "Could not get donation total, unknown error";
        if (error) {
          msg = `Could not get donation total:\n${error.message}`;
        } else if (response) {
          msg = `Could not get donation total, response code ${response.statusCode}`;
        }
        nodecg.log.error(msg);
        reject(msg);
      }
    });
  });
}

async function refreshTrackerData() {
  await getRecentlyReadDonations();
  await updateTotal();
}

if (config.enabled) {
  loginToTracker().then(async () => {
    refreshTrackerData().then(() => {
      setInterval(refreshTrackerData, refreshTime);
    });
  });
}
