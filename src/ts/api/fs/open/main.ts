import { get } from "svelte/store";
import { OpenWithFile } from "../../../applogic/apps/OpenWith";
import { isDisabled } from "../../../applogic/checks";
import { enableApp } from "../../../applogic/enabling";
import { openWindow } from "../../../applogic/events";
import { focusedWindowId, WindowStore } from "../../../applogic/store";
import { Log } from "../../../console";
import { errorMessage } from "../../../errorlogic/main";
import type { ArcFile, PartialArcFile, UserFileLoader } from "../../interface";
import { readFile } from "../file";
import { FileLoaders } from "./loader";
import { LogLevel } from "../../../console/interface";
import { partialFileToComplete } from "../convert";

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

export function findLoaderToOpen(filename: string): UserFileLoader[] {
  let result = [];
  const loaders = Object.entries(FileLoaders);

  for (let i = 0; i < loaders.length; i++) {
    const loader = loaders[i];

    const data = loader[1];

    for (let j = 0; j < data.extensions.length; j++) {
      if (filename.endsWith(data.extensions[j])) result.push(data);
    }

    if (!data.extensions.length) result.push(data);
  }

  return result;
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
  if (isDisabled("OpenWithApp")) {
    return errorMessage(
      "Can't open file",
      `The OpenWithApp application is disabled, so you can't choose an app to open ${file.name}.`,
      null,
      null,
      { caption: "OK", action() {} },
      {
        caption: "Enable OpenWithApp",
        action() {
          enableApp("OpenWithApp");

          OpenWithFile.set(file);

          openWindow("OpenWithApp");
        },
      }
    );
  }

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
    focusedWindowId.set(appId);

    if (window.events && window.events.openFile) window.events.openFile(window);

    return true;
  }

  return false;
}

export async function openUserFile(
  file: PartialArcFile
): Promise<ArcFile | true> {
  Log({
    source: `fs/open.ts: openUserFile`,
    msg: `Converting "${file.filename}": UserFile -> ArcFile: to make openable`,
    level: LogLevel.info,
  });

  let data = await partialFileToComplete(file);

  const apps = findAppToOpen(file.mime);
  const loaders = findLoaderToOpen(file.filename);

  if (!(apps.length > 0) && !(loaders.length > 1)) return data;

  if (apps.length > 0) return openWith(apps[0], data) || data;
  if (loaders.length == 2) {
    loaders[0].loader(data);
    return true;
  }

  return true;
}
