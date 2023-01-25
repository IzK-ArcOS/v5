import { get } from "svelte/store";
import { ConnectedServer } from "../api/main";
import { userDataKey } from "../env/main";
import { UserData, UserName } from "../userlogic/interfaces";
import { LOCALSTORAGE_SIZE, StorageStat } from "./interface";

export function getLocalStorageUsage(): StorageStat {
  let others = 0;

  for (const item in localStorage) {
    if (item == userDataKey) continue;

    others += localStorage[item].toString().length;
  }

  const allUsers = localStorage.getItem(userDataKey).length;

  const currentUser = get(ConnectedServer)
    ? 0
    : btoa(JSON.stringify(get(UserData))).length + get(UserName).length + 4;

  let data: StorageStat = {
    totalSize: LOCALSTORAGE_SIZE,
    allUsers,
    currentUser,
    others,
  };

  return data;
}

export function getFreeSpace() {
  const d = getLocalStorageUsage();

  return d.totalSize - d.currentUser - d.allUsers - d.others;
}
