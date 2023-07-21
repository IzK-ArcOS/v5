import { get } from "svelte/store";
import { WindowStore, getWindow } from "../store";
import type { CompiledAppGroupStore } from "./interface";
import { appGroups } from "./store";
import { isPopulatable } from "../checks";

export function getAppGroups(): {
  groups: CompiledAppGroupStore;
  rest: string[];
} {
  const ws = get(WindowStore);
  const result: CompiledAppGroupStore = {};
  const grouped = [];
  let rest = [];

  for (let i = 0; i < ws.length; i++) {
    rest.push(ws[i].id);
    const group = ws[i].info.appGroup;

    if (!appGroups[group]) continue;

    if (!isPopulatable(ws[i])) {
      grouped.push(ws[i].id);

      continue;
    }

    grouped.push(ws[i].id);

    if (!result[group]) {
      result[group] = { ...appGroups[group], apps: [ws[i].id] };

      continue;
    }

    result[group].apps.push(ws[i].id);
  }

  rest = rest.filter((a) => !grouped.includes(a));

  console.log(grouped);
  console.log(rest);

  return { groups: result, rest };
}
