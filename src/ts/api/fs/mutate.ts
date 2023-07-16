import { get } from "svelte/store";
import { UserToken } from "../../userlogic/interfaces";
import { apiCall, ConnectedServer } from "../main";
import { Log } from "../../console";
import { LogLevel } from "../../console/interface";

export async function copyItem(sourcePath: string, targetPath: string) {
  Log(
    `fs/mutate.ts: copyItem`,
    `Copying ${sourcePath} to ${targetPath}`,
    LogLevel.info
  );

  const server = get(ConnectedServer);

  if (!server) return false;

  await apiCall(
    server,
    "fs/cp",
    { path: btoa(sourcePath), target: btoa(targetPath) },
    get(UserToken)
  );

  return true;
}
