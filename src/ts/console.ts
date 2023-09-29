import dayjs from "dayjs";
import { writable } from "svelte/store";
import { LogLevel, LogLevelData, type LogItem } from "./console/interface";
import { sendReport } from "./reporting/main";

export const LogStore = writable<LogItem[]>([]);

export function Log(source: string, msg: string, level = LogLevel.info) {
  const data: LogItem = { source, msg, level };

  data.timestamp = new Date().getTime();

  const levelCaption = LogLevelData[LogLevel[data.level]].capt;
  const timestamp = dayjs(data.timestamp || 0).format("HH:mm:ss.mmm");

  LogStore.update((currentLog) => {
    currentLog.push(data);

    return currentLog;
  });

  if (data.level == LogLevel.critical)
    sendReport({
      includeUserData: false,
      includeApi: true,
      title: `Critical state`,
      body: `A log item with state CRITICAL was sent:\n${source}: ${msg}\n\nTS: ${timestamp}`,
    });

  console.log(
    `ArcOS: ${timestamp} [${levelCaption}] ${data.source}: ${data.msg}`
  );
}
