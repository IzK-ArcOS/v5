import { get } from "svelte/store";
import { UserData } from "../userlogic/interfaces";

export function getAppPreference(
  id: string,
  key: string
): string | number | boolean | object {
  const udata = get(UserData);

  if (!udata.appdata || !udata.appdata[id]) return undefined;

  return udata.appdata[id][key];
}

export function setAppPreference(
  id: string,
  key: string,
  value: string | number | boolean | object
): boolean {
  const udata = get(UserData);

  if (!udata.appdata || !udata.appdata[id]) return false;

  udata.appdata[id][key] = value;

  UserData.set(udata);

  return true;
}
