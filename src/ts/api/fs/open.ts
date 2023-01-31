import { get } from "svelte/store";
import { OpenWithFile } from "../../applogic/apps/OpenWith";
import { openWindow } from "../../applogic/events";
import type { ArcFile } from "../../applogic/interface";
import { WindowStore } from "../../applogic/store";
import { Log, LogLevel } from "../../console";
import type { UserFile } from "../interface";
import { readFile } from "./file";

export function findAppToOpen(mime: string): string[] {
  Log({
    source: `fs/open.ts: findAppToOpen`,
    msg: `Compiling a list of file handlers that can open mimtype "${mime}"...`,
    level: LogLevel.info,
  });

  const ids: string[] = [];

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (!ws[i].fileMimes) continue;

    if (ws[i].fileMimes.includes(mime)) ids.push(ws[i].id);
  }

  return ids;
}

export function getAllFileHandlers(): string[] {
  Log({
    source: `fs/open.ts: getAllFileHandlers`,
    msg: `Compiling a list of file handler IDs...`,
    level: LogLevel.info,
  });

  const ids: string[] = [];

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].fileMimes) ids.push(ws[i].id);
  }

  return ids;
}

export function openWithDialog(file: ArcFile) {
  Log({
    source: `fs/open.ts: openWithDialog`,
    msg: `Opening ArcOS.OpenWith for "${file.name}"`,
    level: LogLevel.info,
  });

  OpenWithFile.set(file);

  openWindow("OpenWithApp");
}

export function openWith(
  appId: string,
  data: ArcFile,
  openany?: boolean
): boolean {
  Log({
    source: `fs/open.ts: openWith`,
    msg: `Opening ${data.name} with ArcOS.${appId}`,
    level: LogLevel.info,
  });

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    const window = ws[i];
    if (
      !window.fileMimes ||
      (!window.fileMimes.includes(data.mime) && !openany) ||
      appId != window.id
    )
      continue;

    window.openedFile = data;

    openWindow(appId);

    if (window.events && window.events.openFile) window.events.openFile(window);

    return true;
  }

  return false;
}

export async function openUserFile(file: UserFile): Promise<ArcFile | true> {
  Log({
    source: `fs/open.ts: openUserFile`,
    msg: `Converting "${file.filename}": UserFile -> ArcFile: to make openable`,
    level: LogLevel.info,
  });

  let data: ArcFile = {
    data: await readFile(file.scopedPath),
    name: file.filename,
    path: file.scopedPath,
    mime: file.mime,
  };

  const apps = findAppToOpen(file.mime);

  if (!apps.length) return data;

  if (apps.length == 1) return openWith(apps[0], data) || true;

  openWithDialog(data);

  data = null;

  return true;
}
