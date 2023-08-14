import { get } from "svelte/store";
import { Log } from "../../console";
import { UserToken } from "../../userlogic/interfaces";
import type {
  DirectoryGet,
  DirReadResponse,
  PartialUserDir,
} from "../interface";
import { apiCall, ConnectedServer } from "../main";
import { LogLevel } from "../../console/interface";

export async function getDirectory(path: string = "./"): DirectoryGet {
  Log(
    "fs/directory.ts: getDirectory",
    `Requesting directory contents of "${path}" from ArcAPI`,
    LogLevel.info
  );

  const server = get(ConnectedServer);

  if (!server) return false;

  const req = (await apiCall(
    server,
    "fs/dir/get",
    { path: path ? btoa(path) : null },
    get(UserToken)
  )) as DirReadResponse;

  if (!req || !req.valid) return false;

  return req.data;
}

export function sortDirectories(dir: PartialUserDir[]) {
  if (!dir) return [];

  return dir.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
}

export async function createDirectory(path: string): Promise<boolean> {
  Log("fs/directory.ts: createDirectory", `Creating ${path}`);
  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "fs/dir/create",
    { path: btoa(path) },
    get(UserToken)
  );

  return req.valid;
}
