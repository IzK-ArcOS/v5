import { get } from "svelte/store";
import { getAppPreference, setAppPreference } from "../applogic/pref";
import { WindowStore, getWindow } from "../applogic/store";
import { Log } from "../console";
import sleep from "../sleep";
import { UserData } from "../userlogic/interfaces";
import { isPopulatable } from "../applogic/checks";

let LOCKED = false;

export async function alignDesktopIcons(overrideLock = false) {
  Log(
    "desktop/icons.ts: alignDesktopIcons",
    `Automatically positioning desktop icons (OVERRIDE=${overrideLock}, LOCKED=${LOCKED})`
  );

  if (LOCKED && !overrideLock) return;
  if (!overrideLock) LOCKED = true;

  await sleep(100); // Wait for the rest of the apps to be loaded

  const apps = [...get(WindowStore)].sort((a) => (a.info.hidden ? 1 : -1));

  const GRIDX = 80;
  const GRIDY = 85;
  const MAXX = 4;

  let offsetX = 0;
  let offsetY = 0;

  for (let i = 0; i < apps.length; i++) {
    const app = apps[i];

    if (app.core || app.id == "ExperimentsApp") continue;

    setAppPreference("ArcShell", `icon$${app.id}`, {
      x: offsetX * GRIDX,
      y: offsetY * GRIDY,
    });

    await sleep(1);

    offsetX++;

    if (offsetX >= MAXX) {
      offsetX = 0;
      offsetY++;
    }
  }
}

export async function checkDesktopIconLength() {
  const udata = get(UserData);
  const shell = udata.appdata["ArcShell"];

  if (!shell) return;

  const icons = Object.keys(shell).map((i) => i.startsWith("icon$")).length;
  const apps = get(WindowStore).length;

  // TODO: Properly do this function
}

export function isIconSpotAvailable(x: number, y: number) {
  const [IW, IH] = [80, 85];
  const udata = get(UserData);
  const shell = udata.appdata["ArcShell"] as {
    [key: string]: { x: number; y: number };
  };

  if (!shell) return false;

  const icons = Object.keys(shell).filter((i) => i.startsWith("icon$"));

  for (let i = 0; i < icons.length; i++) {
    const icon = shell[icons[i]];

    if (
      icon &&
      ((x >= icon.x && x < icon.x + IW && y >= icon.y && y < icon.y + IH) ||
        (icon.x >= x && icon.x < x + IW && icon.y >= y && icon.y < y + IH))
    )
      return false;
  }

  return true;
}
