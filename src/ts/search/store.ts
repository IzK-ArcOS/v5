import { get } from "svelte/store";
import { currentSettingsPage } from "../applogic/apps/SettingsApp/main";
import { SettingsPages } from "../applogic/apps/SettingsApp/store";
import { openWindow } from "../applogic/events";
import { WindowStore } from "../applogic/store";
import type { SearchItem } from "./interface";

export function getSearchItems(): SearchItem[] {
  const apps = compileSearchableApps();
  const settings = compileSearchableSettingsPages();

  return [...apps, ...settings];
}

export function compileSearchableApps(): SearchItem[] {
  const result: SearchItem[] = [];

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].info.hidden) continue;

    result.push({
      caption: ws[i].info.name,
      description: ws[i].info.description,
      image: ws[i].info.icon,
      action: () => {
        openWindow(ws[i].id);
      },
    });
  }

  return result;
}

export function compileSearchableSettingsPages(): SearchItem[] {
  const result: SearchItem[] = [];
  const pages = SettingsPages;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    result.push({
      image: page.icon,
      caption: page.name,
      action: () => {
        openWindow("SettingsApp");

        setTimeout(() => {
          currentSettingsPage.set(page);
        });
      },
    });
  }

  return result;
}
