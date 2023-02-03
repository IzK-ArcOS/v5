import { get } from "svelte/store";
import { UserToken } from "../../userlogic/interfaces";
import { apiCall, ConnectedServer } from "../main";

export async function renameItem(oldPath: string, newPath: string) {
  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "fs/rename",
    { oldpath: btoa(oldPath), newpath: btoa(newPath) },
    get(UserToken)
  );

  return req.valid;
}
