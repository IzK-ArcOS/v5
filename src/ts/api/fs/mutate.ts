import { get } from "svelte/store";
import { UserToken } from "../../userlogic/interfaces";
import { apiCall, ConnectedServer } from "../main";

export async function copyItem(sourcePath: string, targetPath: string) {
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
