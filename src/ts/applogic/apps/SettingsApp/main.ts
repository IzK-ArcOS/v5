import type { SvelteComponent } from "svelte";
import { writable } from "svelte/store";
import appsIcon from "../../../../assets/apps/settings/apps.svg";
import desktopIcon from "../../../../assets/apps/settings/desktop.svg";
import personalizationIcon from "../../../../assets/apps/settings/personalization.svg";
import startIcon from "../../../../assets/apps/settings/startmenu.svg";
import taskbarIcon from "../../../../assets/apps/settings/taskbar.svg";
import windowsIcon from "../../../../assets/apps/settings/windows.svg";
import Apps from "../../../../lib/Apps/Settings/Pages/Apps.svelte";
import Desktop from "../../../../lib/Apps/Settings/Pages/Desktop.svelte";
import Personalization from "../../../../lib/Apps/Settings/Pages/Personalization.svelte";
import StartMenu from "../../../../lib/Apps/Settings/Pages/StartMenu.svelte";
import Taskbar from "../../../../lib/Apps/Settings/Pages/Taskbar.svelte";
import Windows from "../../../../lib/Apps/Settings/Pages/Windows.svelte";
import { hotSwapAppIcon } from "../../icon";
import { setTitleSuffix } from "../../title";

export const currentSettingsPage = writable<SettingsPage>(null);

export function setSettingsPage(page: SettingsPage) {
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
    name: "Personalization",
    icon: personalizationIcon,
    content: Personalization,
    sep: true,
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
    name: "Desktop",
    icon: desktopIcon,
    content: Desktop,
    sep: true,
  },
  {
    name: "Apps",
    icon: appsIcon,
    content: Apps,
  },
];
