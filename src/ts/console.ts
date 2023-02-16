import dayjs from "dayjs";
import { get, writable } from "svelte/store";

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

export const log = writable<LogItem[]>([]);

export function Log(data: LogItem) {
  data.timestamp = new Date().getTime();

  const l = get(log);
  const t = dayjs(data.timestamp || 0).format("HH:mm:ss.mmm");

  l.push(data);

  log.set(l);

  const d = LogLevelData[LogLevel[data.level]];

  console.log(`ArcOS: ${t} [${d.capt}] ${data.source}: ${data.msg}`);
}
