import { get } from "svelte/store";
import { AppStore, ProcessStore } from "../../applogic/store";

export function getParentDirectory(p: string) {
  const split = p.split("/");

  if (p == "./") return p;
  if (!split.length) return p;

  if (split.length == 1) return "./";

  split.splice(-1);

  const newPath = split.join("/");

  return newPath;
}

export function closeFile(pid: number) {
  const processStore = get(ProcessStore);

  for (const strI in processStore) {
    const i = parseInt(strI)
    if (processStore[i].id == pid) {
      processStore[i].openedFile = null;
    }
  }

  ProcessStore.set(processStore);
}
