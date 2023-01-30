import { get, writable } from "svelte/store";
import {
  FileBrowserOpenCancelled,
  FileBrowserOpeningFile,
} from "../../applogic/apps/FileBrowser/main";
import { Log, LogLevel } from "../../console";
import { UserToken } from "../../userlogic/interfaces";
import { ConnectedServer } from "../main";
import { generateParamStr } from "../params";

export const abortFileReader = writable<boolean>(false);

export async function readFile(path: string): Promise<ArrayBuffer> {
  Log({
    source: "fs/file.ts: readFile",
    msg: `Requesting file contents of "${path}" from ArcAPI`,
    level: LogLevel.info,
  });

  const defaultValue = new ArrayBuffer(0);
  const server = get(ConnectedServer);

  if (!server) return defaultValue;

  const init: RequestInit = {
    headers: {
      Authorization: `Bearer ${get(UserToken)}`,
    },
  };

  let controller = new AbortController();

  const params = generateParamStr({ path: btoa(path) });
  const req = await fetch(`${server}/fs/file/get${params}`, {
    ...init,
    signal: controller.signal,
  });

  abortFileReader.set(false);

  abortFileReader.subscribe((v) => {
    if (!v) return;

    Log({
      source: "fs/file.ts: readFile",
      msg: `Aborting readFile for "${path}" as requested by the user...`,
      level: LogLevel.error,
    });

    controller.abort();

    FileBrowserOpenCancelled.set(true);

    abortFileReader.set(false);
  });

  if (req.status != 200) return defaultValue;

  const x = await (await req).blob();

  return await x.arrayBuffer();
}
