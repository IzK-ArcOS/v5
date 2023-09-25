import { restart, shutdown } from "../desktop/power";
import { ExitIcon } from "../icon/apps";
import type { SearchItem } from "./interface";
import { compileSearchableApps } from "./store/apps";
import { compileSearchableFiles } from "./store/files";
import { compileSearchableSettingsPages } from "./store/settings";

const searchProviders = [
  compileSearchableApps,
  compileSearchableSettingsPages,
  compileSearchableFiles,
];

const powerOptions: SearchItem[] = [
  {
    caption: "Shutdown",
    description: "Leave the desktop and turn off ArcOS",
    action: shutdown,
    image: ExitIcon,
  },
  {
    caption: "Restart",
    description: "Leave the desktop and reload ArcOS",
    action: () => restart(false),
    image: ExitIcon,
  },
];

export async function getSearchItems(): Promise<SearchItem[]> {
  let result: SearchItem[] = [...powerOptions];

  for (let i = 0; i < searchProviders.length; i++) {
    result.push(...(await searchProviders[i]()));
  }

  return result;
}
