import { get } from "svelte/store";
import { LogStore } from "../console";
import { LogLevel, type LogItem, LogLevelData } from "./interface";
import dayjs from "dayjs";

export type CollectorResult = { [key: string]: LogItem[] };
export type IterableCollectorResult = [string, LogItem[]][];

export function collectLogsBySource(): CollectorResult {
  const logs = get(LogStore);

  let sources = [];
  let items: CollectorResult = {};

  for (let i = 0; i < logs.length; i++) {
    const logItem = logs[i];

    if (!sources.includes(logItem.source)) {
      sources.push(logItem.source);
    }

    items[logItem.source] = Array.prototype.concat(
      items[logItem.source] || [],
      [logItem]
    );
  }

  return items;
}

export function compileStringLog(): string[] {
  const result: string[] = [];
  const logs = get(LogStore);

  for (let i = 0; i < logs.length; i++) {
    const item = logs[i];
    const caption = LogLevelData[LogLevel[item.level]].capt;
    const time = dayjs(item.timestamp || 0).format("HH:mm:ss.mmm");

    result.push(`${time} [${caption}] ${item.source}: ${item.msg}`);
  }

  return result;
}
