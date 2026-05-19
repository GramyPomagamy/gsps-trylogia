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
import { Asset, LogoCycle, MediaBoxItem } from "./custom";

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
  'assets:media-box': Asset[];
  mediaBoxItem: MediaBoxItem;
  logoCycles: LogoCycle[];
  splitsTimer: number
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
  mediaBoxItem,
  logoCycles,
  splitsTimer,
  ReplicantMap,
};
