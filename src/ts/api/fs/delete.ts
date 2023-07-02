import { get } from "svelte/store";
import { LogLevel } from "../../console/interface";
import { ConnectedServer, apiCall } from "../main";
import { Log } from "../../console";
import { UserToken } from "../../userlogic/interfaces";

export async function deleteItem(path: string) {
  Log({
    source: "fs/file.ts: deleteItem",
    msg: `Deleting item "${path}" from ArcFS`,
    level: LogLevel.info,
  });

  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "fs/rm",
    { path: btoa(path) },
    get(UserToken),
    null,
    null,
    true
  );

  return !(req.valid == false);
}
