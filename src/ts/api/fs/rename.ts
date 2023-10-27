import { get } from "svelte/store";
import { UserToken } from "../../userlogic/interfaces";
import { apiCall, ConnectedServer } from "../main";
import { Log } from "../../console";
import { LogLevel } from "../../console/interface";
import { toBase64 } from "../../base64";

export async function renameItem(oldPath: string, newPath: string) {
  Log(
    `fs/rename.ts: renameItem`,
    `Renaming ${oldPath} to ${newPath}`,
    LogLevel.info
  );

  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "fs/rename",
    { oldpath: toBase64(oldPath), newpath: toBase64(newPath) },
    get(UserToken)
  );

  return req.valid;
}
