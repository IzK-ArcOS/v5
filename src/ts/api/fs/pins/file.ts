import { get } from "svelte/store";
import { UserData } from "../../../userlogic/interfaces";

export function pinFile(path: string) {
  checkFilePins();

  const udata = get(UserData);

  if (udata.sh.desktop.pinnedFiles.includes(path)) return false;

  udata.sh.desktop.pinnedFiles.push(path);

  UserData.set(udata);

  return true;
}

export function unpinFile(path: string) {
  checkFilePins();

  const udata = get(UserData);
  const pins = udata.sh.desktop.pinnedFiles;

  if (!pins.includes(path)) return false;

  pins.splice(pins.indexOf(path), 1);

  udata.sh.desktop.pinnedFiles = pins;

  UserData.set(udata);

  return true;
}

export function isFilePinned(path: string) {
  const udata = get(UserData);
  const pins = udata.sh.desktop.pinnedFiles;

  return pins && pins.includes(path);
}

export function checkFilePins() {
  const udata = get(UserData);

  if (
    udata.sh.desktop.pinnedFiles &&
    Array.isArray(udata.sh.desktop.pinnedFiles)
  )
    return true;

  udata.sh.desktop.pinnedFiles = [];

  UserData.set(udata);

  return false;
}
