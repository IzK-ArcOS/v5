import dayjs from "dayjs";
import { get, writable } from "svelte/store";
import { LogLevelData, type LogItem, LogLevel } from "./console/interface";
import { sendReport } from "./reporting/main";

export const LogStore = writable<LogItem[]>([]);

export function Log(source: string, msg: string, level = LogLevel.info) {
  const data: LogItem = { source, msg, level };

  data.timestamp = new Date().getTime();

  const currentLog = get(LogStore);
  const levelCaption = LogLevelData[LogLevel[data.level]].capt;
  const timestamp = dayjs(data.timestamp || 0).format("HH:mm:ss.mmm");

  currentLog.push(data);

  LogStore.set(currentLog);

  if (data.level == LogLevel.critical) sendReport();

  console.log(
    `ArcOS: ${timestamp} [${levelCaption}] ${data.source}: ${data.msg}`
  );
}
