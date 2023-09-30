import { get } from "svelte/store";
import { apiCall, ConnectedServer } from "../api/main";
import { UserToken } from "../userlogic/interfaces";
import { toBase64 } from "../base64";

export async function deleteMessage(id: string): Promise<boolean> {
  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "messages/delete",
    { id: toBase64(id) },
    get(UserToken)
  );

  return !req;
}
