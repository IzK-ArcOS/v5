import { get } from "svelte/store";
import { Log, LogLevel } from "../../console";
import { UserToken } from "../../userlogic/interfaces";
import type { DirectoryGet, DirReadResponse } from "../interface";
import { apiCall, ConnectedServer } from "../main";

export async function getDirectory(path: string = "./"): DirectoryGet {
  Log({
    source: "fs/directory.ts: getDirectory",
    msg: `Requesting directory contents of "${path}" from ArcAPI`,
    level: LogLevel.info,
  });

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

export async function createDirectory(path: string): Promise<boolean> {
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
