import { TimeStruct } from "../extension/lib/time";
import {
  Timer,
  CurrentSplit,
  Splits,
  Countdown,
  CountdownRunning,
} from "./generated";
import { DonationsToRead } from "./generated/donationsToRead";
import { ReadDonations } from "./generated/readDonations";
import { Total } from "./generated/total";

type ReplicantMap = {
  timer: Timer;
  nowPlaying: string;
  completion: string;
  currentSplit: CurrentSplit;
  splits: Splits;
  countdown: TimeStruct;
  countdownRunning: CountdownRunning;
  donationsToRead: DonationsToRead;
  currentEventTrackerId: number;
  readDonations: ReadDonations;
  total: Total;
};

export {
  timer,
  nowPlaying,
  completion,
  currentSplit,
  splits,
  countdown,
  donationsToRead,
  currentEventTrackerId,
  readDonations,
  total,
  ReplicantMap,
};
