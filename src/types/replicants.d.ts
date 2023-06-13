import { TimeStruct } from '../extension/lib/time';
import { Timer, CurrentSplit, Splits, Countdown, CountdownRunning } from './generated';

type ReplicantMap = {
  timer: Timer;
  nowPlaying: string;
  completion: string;
  currentSplit: CurrentSplit;
  splits: Splits;
  countdown: TimeStruct;
  countdownRunning: CountdownRunning;
};

export { timer, nowPlaying, completion, currentSplit, splits, countdown, ReplicantMap };
