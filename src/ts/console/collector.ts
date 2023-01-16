import { get } from "svelte/store";
import { log, LogItem } from "../console";

export type CollectorResult = { [key: string]: LogItem[] };
export type IterableCollectorResult = [string, LogItem[]][];

export function collectLogsBySource(): CollectorResult {
  const logs = get(log);

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

  console.log(items);

  return items;
}
