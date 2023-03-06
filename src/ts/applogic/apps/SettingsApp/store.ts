import accountIcon from "../../../../assets/apps/settings/account.svg";
import appsIcon from "../../../../assets/apps/settings/apps.svg";
import desktopIcon from "../../../../assets/apps/settings/desktop.svg";
import themesIcon from "../../../../assets/apps/settings/themes.svg";
import personalizationIcon from "../../../../assets/apps/settings/personalization.svg";
import shellIcon from "../../../../assets/apps/settings/taskbar.svg";
import windowsIcon from "../../../../assets/apps/settings/windows.svg";
import systemIcon from "../../../../assets/systemIcon.svg";
import About from "../../../../lib/Apps/Settings/Pages/About.svelte";
import Account from "../../../../lib/Apps/Settings/Pages/Account.svelte";
import Apps from "../../../../lib/Apps/Settings/Pages/Apps.svelte";
import Desktop from "../../../../lib/Apps/Settings/Pages/Desktop.svelte";
import Personalization from "../../../../lib/Apps/Settings/Pages/Personalization.svelte";
import Shell from "../../../../lib/Apps/Settings/Pages/Shell.svelte";
import Theme from "../../../../lib/Apps/Settings/Pages/Theme.svelte";
import Windows from "../../../../lib/Apps/Settings/Pages/Windows.svelte";
import type { SettingsPage } from "./interface";

export const SettingsPages: SettingsPage[] = [
  {
    name: "Account",
    icon: accountIcon,
    content: Account,
    sep: true,
  },
  {
    name: "Themes",
    icon: themesIcon,
    content: Theme,
  },
  {
    name: "Visuals",
    icon: personalizationIcon,
    content: Personalization,
  },
  {
    name: "Shell",
    icon: shellIcon,
    content: Shell,
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
