import { get } from "svelte/store";
import { UserData } from "../userlogic/interfaces";
import { Log } from "../console";

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
  Log(
    "applogic/pref.ts: setAppPreference",
    `Setting ${key} in ${id} to type ${typeof value}...`
  );

  const udata = get(UserData);

  if (!udata.appdata) return false;

  if (!udata.appdata[id]) udata.appdata[id] = {};

  udata.appdata[id][key] = value;

  UserData.set(udata);

  return true;
}
