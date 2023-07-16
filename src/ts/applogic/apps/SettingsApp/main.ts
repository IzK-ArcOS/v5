import { writable } from "svelte/store";
import { Log } from "../../../console";
import { hotSwapAppIcon } from "../../icon";
import { setTitleSuffix } from "../../title";
import type { SettingsPage } from "./interface";
import { LogLevel } from "../../../console/interface";

export const currentSettingsPage = writable<SettingsPage>(null);
export const currentCollapsibleT = writable<string>(null);

export function setSettingsPage(page: SettingsPage) {
  Log(
    "apps/SettingsApp",
    `Opening settings page '${page.name}'`,
    LogLevel.info
  );
  currentCollapsibleT.set(null);
  currentSettingsPage.set(page);

  hotSwapAppIcon(page.icon, "SettingsApp");
  setTitleSuffix(` - ${page.name}`, "SettingsApp");
}
