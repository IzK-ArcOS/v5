import { get } from "svelte/store";
import { getAppPreference, setAppPreference } from "../applogic/pref";
import { WindowStore } from "../applogic/store";
import { Log } from "../console";
import sleep from "../sleep";
import { UserData } from "../userlogic/interfaces";

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

  console.log(apps);
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

  if (icons != apps) {
    console.warn("ainah");
  }
}
