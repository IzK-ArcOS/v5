import { currentSettingsPage } from "../../applogic/apps/SettingsApp/main";
import { SettingsPages } from "../../applogic/apps/SettingsApp/store";
import { createProcess } from "../../applogic/events";
import type { SearchItem } from "../interface";

export function compileSearchableSettingsPages(): SearchItem[] {
  const result: SearchItem[] = [];
  const pages = SettingsPages;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    result.push({
      image: page.icon,
      caption: page.name,
      action: () => {
        createProcess("SettingsApp");

        setTimeout(() => {
          currentSettingsPage.set(page);
        });
      },
    });
  }

  return result;
}
