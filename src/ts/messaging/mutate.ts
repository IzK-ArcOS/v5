import { get } from "svelte/store";
import { apiCall, ConnectedServer } from "../api/main";
import { UserToken } from "../userlogic/interfaces";

export async function deleteMessage(id: string): Promise<boolean> {
  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "messages/delete",
    { id: btoa(id) },
    get(UserToken)
  );

  return !req;
}
