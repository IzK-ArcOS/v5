export interface LogItem {
  timestamp?: number;
  level: LogLevel;
  msg: string;
  source: string;
}

export enum LogLevel {
  info,
  warn,
  error,
  critical,
}

export const LogLevelData: { [key: string]: { capt: string } } = {
  info: {
    capt: "INFO",
  },
  warn: {
    capt: "WARN",
  },
  error: {
    capt: "ERRR",
  },
  critical: {
    capt: "CRIT",
  },
};
