import axios from "axios";
import { get, writable } from "svelte/store";
import { Log } from "../../console";
import { LogLevel } from "../../console/interface";
import { UserToken } from "../../userlogic/interfaces";
import { ConnectedServer } from "../main";
import { generateParamStr } from "../params";
import { getAuthcode } from "../authcode";
import { getServer } from "../server";
import type { PartialArcFile } from "../interface";
import { toBase64 } from "../../base64";
import { fbState } from "../../applogic/apps/FileBrowser/main";
import { getParentDirectory } from "./main";
import { getDirectory } from "./directory";

export const abortFileReader = writable<boolean>(false);

export async function readFile(path: string): Promise<ArrayBuffer | false> {
  Log(
    "fs/file.ts: readFile",
    `Requesting file contents of "${path}" from ArcAPI`,
    LogLevel.info
  );

  const server = get(ConnectedServer);
  const authCode = getAuthcode(getServer());

  if (!server) return false;

  const init: RequestInit = {
    headers: {
      Authorization: `Bearer ${get(UserToken)}`,
    },
  };

  const controller = new AbortController();
  const params = generateParamStr({ ac: authCode, path: toBase64(path) });

  try {
    let req = await fetch(`${server}/fs/file/get${params}`, {
      ...init,
      signal: controller.signal,
    });

    abortFileReader.set(false);

    abortFileReader.subscribe((v) => {
      if (!v) return;

      Log(
        "fs/file.ts: readFile",
        `Aborting readFile for "${path}" as requested by the user...`,
        LogLevel.error
      );

      controller.abort();

      fbState.update((v) => {
        v.openCancelled = true;

        return v;
      });

      abortFileReader.set(false);
    });

    if (req.status != 200) return false;

    const x = await req.blob();

    // Free up used memory
    req = null;

    return await x.arrayBuffer();
  } catch {
    return false;
  }
}

export async function writeFile(path: string, data: Blob): Promise<boolean> {
  Log("fs/directory.ts: writeFile", `Creating ${path}`);

  const server = get(ConnectedServer);
  const authCode = getAuthcode(getServer());

  if (!server) return false;

  const params = generateParamStr({ path: toBase64(path), ac: authCode });

  const req = await axios.post(`${server}/fs/file/write${params}`, data, {
    headers: {
      Authorization: `Bearer ${get(UserToken)}`,
    },
    onUploadProgress(progress) {
      const perc = (progress.loaded / progress.total) * 100;

      fbState.update((v) => {
        v.uploadProgress = perc;

        return v;
      });
    },
  });

  return req.status == 200;
}

export async function getPartialFile(
  path: string
): Promise<PartialArcFile | false> {
  const parent = getParentDirectory(path);

  const dir = await getDirectory(parent);

  if (!dir) return false;

  return dir.files.filter((f) => f.scopedPath == path)[0];
}

export function sortFiles(dir: PartialArcFile[]) {
  if (!dir) return [];

  return dir.sort((a, b) =>
    a.filename.toLowerCase() > b.filename.toLowerCase() ? 1 : -1
  );
}
