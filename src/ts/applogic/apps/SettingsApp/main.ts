import { writable } from "svelte/store";
import { Log, LogLevel } from "../../../console";
import { hotSwapAppIcon } from "../../icon";
import { setTitleSuffix } from "../../title";
import type { SettingsPage } from "./interface";
import { getPID } from "../../pid";

export const currentSettingsPage = writable<SettingsPage>(null);
export const currentCollapsibleT = writable<string>(null);

export function setSettingsPage(page: SettingsPage) {
  Log({
    source: "apps/SettingsApp",
    level: LogLevel.info,
    msg: `Opening settings page '${page.name}'`,
  });
  currentCollapsibleT.set(null);
  currentSettingsPage.set(page);

  hotSwapAppIcon(page.icon, "SettingsApp");
  setTitleSuffix(` - ${page.name}`, getPID("SettingsApp"));
}
