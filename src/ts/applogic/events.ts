import { get } from "svelte/store";
import { startOpened } from "../desktop/main";
import { isLoaded, isOpened } from "./checks";
import { getWindow, OpenApps, updateStores, WindowStore } from "./store";

export function openWindow(id: string) {
  if (!isLoaded(id) || isOpened(id)) {
    return false;
  }

  const oa = get(OpenApps);

  oa.push(getWindow(id));

  OpenApps.set(oa);

  startOpened.set(false);

  updateStores();

  return true;
}

export function closeWindow(id: string) {
  if (!isOpened(id)) {
    return false;
  }

  const oa = get(OpenApps);

  for (let i = 0; i < oa.length; i++) {
    if (oa[i].id == id) {
      oa.splice(i, 1);
      break;
    }
  }

  OpenApps.set(oa);

  updateStores();

  return true;
}

//OpenApps.subscribe(updateStores);
