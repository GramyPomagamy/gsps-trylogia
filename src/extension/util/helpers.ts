import type NodeCG from "nodecg/types";


/**
 * Checks if number needs a 0 adding to the start and does so if needed.
 * @param num Number which you want to turn into a padded string.
 */
export function padTimeNumber(num: number): string {
  return num.toString().padStart(2, "0");
}

/**
 * Converts a time string (HH:MM:SS) into milliseconds.
 * @param time Time string you wish to convert.
 */
export function timeStrToMS(time: string): number {
  const ts = time.split(":");
  if (ts.length === 2) {
    ts.unshift("00"); // Adds 0 hours if they are not specified.
  }
  return Date.UTC(1970, 0, 1, Number(ts[0]), Number(ts[1]), Number(ts[2]));
}

/**
 * Converts milliseconds into a time string (HH:MM:SS).
 * @param ms Milliseconds you wish to convert.
 */
export function msToTimeStr(ms: number): string {
  let string = "";
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  if (hours > 0) {
    string += `${hours}:`;
  }
  string += `${padTimeNumber(minutes)}:${padTimeNumber(seconds)}`;
  return string;
}

/**
 * Allow a script to wait for an amount of milliseconds.
 * @param ms Milliseconds to sleep for.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Simple helper function to handle NodeCG/our message acknowledgements.
 * @param ack The acknoledgement function itself.
 * @param err Error to supply if any.
 * @param data Anything else you want to send alongside.
 */
export function processAck<T>(
  ack: NodeCG.Acknowledgement | undefined,
  err: Error | null,
  data?: T
): void {
  if (ack && !ack.handled) {
    ack(err, data);
  }
}

export function deltaToTimeStr(ms: number) {
  let negative;
  if (ms < 0) {
    negative = true;
  }
  let str = "";
  const seconds = Math.floor((Math.abs(ms) / 1000) % 60);
  const minutes = Math.floor((Math.abs(ms) / (1000 * 60)) % 60);
  const hours = Math.floor(Math.abs(ms) / (1000 * 60 * 60));
  if (hours) {
    if (negative) {
      str += `-${hours}:`;
    } else {
      str += `${hours}:`;
    }
  }
  str += `${padTimeNumber(Math.abs(minutes))}:${padTimeNumber(
    Math.abs(seconds)
  )}`;
  if (str.charAt(0) != "-" && ms != 0) {
    str = `+${str}`;
  }
  return str;
}
