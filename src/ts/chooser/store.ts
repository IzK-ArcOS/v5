import { get, writable } from "svelte/store";
import type { ArcFile, Params } from "../api/interface";
import { WindowStore } from "../applogic/store";
import type { ChooseDialogTargets } from "./interface";

export const chooseTargets: ChooseDialogTargets = writable<Params>({});

export function setTargetFile(id: string, file: ArcFile): boolean {
  const targets = get(chooseTargets);
  const targetId = targets[id];

  const ws = get(WindowStore);

  let index = null;

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == targetId) index = i;
  }

  if (index == null) return false;

  ws[index].openedFile = file;

  if (ws[index].events && ws[index].events.openFile)
    ws[index].events.openFile(ws[index]);

  delete ws[index].overlays[id];

  WindowStore.set(ws);

  delete targets[id];

  chooseTargets.set(targets);

  return true;
}

export function getChooserTarget(id: string): string | false {
  const targets = get(chooseTargets);

  return targets[id] || false;
}

export function assignTarget(id: string, targetId: string): boolean {
  const targets = get(chooseTargets);

  if (targets[id]) return false;

  targets[id] = targetId;

  chooseTargets.set(targets);

  return true;
}
