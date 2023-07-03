import { get } from "svelte/store";
import { AppStore } from "../../applogic/store";
import type { SearchItem } from "../interface";
import { createProcess } from "../../applogic/events";
import { isPopulatable } from "../../applogic/checks";

export function compileSearchableApps(): SearchItem[] {
  const result: SearchItem[] = [];

  const apps = Object.entries(get(AppStore));

  for (let i = 0; i < apps.length; i++) {
    if (!isPopulatable(apps[i][1])) continue;

    result.push({
      caption: apps[i][1].info.name,
      description: apps[i][1].info.description,
      image: apps[i][1].info.icon,
      action: () => {
        createProcess(apps[i][0]);
      },
    });
  }

  return result;
}
