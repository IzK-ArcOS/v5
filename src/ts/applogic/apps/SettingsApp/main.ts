import type { SvelteComponent } from "svelte";
import { writable } from "svelte/store";
import accountIcon from "../../../../assets/apps/settings/account.svg";
import appsIcon from "../../../../assets/apps/settings/apps.svg";
import desktopIcon from "../../../../assets/apps/settings/desktop.svg";
import personalizationIcon from "../../../../assets/apps/settings/personalization.svg";
import startIcon from "../../../../assets/apps/settings/startmenu.svg";
import taskbarIcon from "../../../../assets/apps/settings/taskbar.svg";
import windowsIcon from "../../../../assets/apps/settings/windows.svg";
import systemIcon from "../../../../assets/systemIcon.svg";
import About from "../../../../lib/Apps/Settings/Pages/About.svelte";
import Account from "../../../../lib/Apps/Settings/Pages/Account.svelte";
import Apps from "../../../../lib/Apps/Settings/Pages/Apps.svelte";
import Desktop from "../../../../lib/Apps/Settings/Pages/Desktop.svelte";
import Personalization from "../../../../lib/Apps/Settings/Pages/Personalization.svelte";
import StartMenu from "../../../../lib/Apps/Settings/Pages/StartMenu.svelte";
import Taskbar from "../../../../lib/Apps/Settings/Pages/Taskbar.svelte";
import Windows from "../../../../lib/Apps/Settings/Pages/Windows.svelte";
import { hotSwapAppIcon } from "../../icon";
import { setTitleSuffix } from "../../title";

export const currentSettingsPage = writable<SettingsPage>(null);
export const currentCollapsibleT = writable<string>(null);

export function setSettingsPage(page: SettingsPage) {
  currentCollapsibleT.set(null);
  currentSettingsPage.set(page);

  hotSwapAppIcon(page.icon, "SettingsApp");
  setTitleSuffix(` - ${page.name}`, "SettingsApp");
}

interface SettingsPage {
  name: string;
  icon: string;
  content: typeof SvelteComponent;
  sep?: boolean;
  disabled?: boolean;
}

export const SettingsPages: SettingsPage[] = [
  {
    name: "Account",
    icon: accountIcon,
    content: Account,
    sep: true,
  },
  {
    name: "Visuals",
    icon: personalizationIcon,
    content: Personalization,
  },
  {
    name: "Taskbar",
    icon: taskbarIcon,
    content: Taskbar,
  },
  {
    name: "Start Menu",
    icon: startIcon,
    content: StartMenu,
    sep: true,
  },
  {
    name: "Windows",
    icon: windowsIcon,
    content: Windows,
  },
  {
    name: "Wallpaper",
    icon: desktopIcon,
    content: Desktop,
    sep: true,
  },
  {
    name: "Apps",
    icon: appsIcon,
    content: Apps,
    sep: true,
  },
  {
    name: "About",
    icon: systemIcon,
    content: About,
  },
];
