import { get } from "svelte/store";
import { UserData } from "../../../userlogic/interfaces";

export function pinDirectory(path: string) {
  checkDirectoryPins();

  const udata = get(UserData);

  if (udata.sh.desktop.pinnedFolders.includes(path)) return false;

  udata.sh.desktop.pinnedFolders.push(path);

  UserData.set(udata);

  return true;
}

export function unpinDirectory(path: string) {
  checkDirectoryPins();

  const udata = get(UserData);
  const pins = udata.sh.desktop.pinnedFolders;

  if (!pins.includes(path)) return false;

  pins.splice(pins.indexOf(path), 1);

  udata.sh.desktop.pinnedFolders = pins;

  UserData.set(udata);

  return true;
}

export function isDirPinned(path: string) {
  const udata = get(UserData);
  const pins = udata.sh.desktop.pinnedFolders;

  return pins && pins.includes(path);
}

export function checkDirectoryPins() {
  const udata = get(UserData);

  if (
    udata.sh.desktop.pinnedFolders &&
    Array.isArray(udata.sh.desktop.pinnedFolders)
  )
    return true;

  udata.sh.desktop.pinnedFolders = [];

  UserData.set(udata);

  return false;
}
