import { get } from "svelte/store";
import { LogLevel } from "../../console/interface";
import { ConnectedServer, apiCall } from "../main";
import { Log } from "../../console";
import { UserToken } from "../../userlogic/interfaces";
import { toBase64 } from "../../base64";

export async function deleteItem(path: string) {
  Log(
    "fs/file.ts: deleteItem",
    `Deleting item "${path}" from ArcFS`,
    LogLevel.info
  );

  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "fs/rm",
    { path: toBase64(path) },
    get(UserToken),
    null,
    null,
    true
  );

  return !(req.valid == false);
}
