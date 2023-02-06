import { get } from "svelte/store";
import { apiCall, ConnectedServer } from "../api/main";
import { UserToken } from "../userlogic/interfaces";

export async function sendMessage(receiver: string, body: string) {
  const server = await get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "messages/send",
    { target: btoa(receiver) },
    get(UserToken),
    null,
    body
  );

  return !req;
}

export async function replyToMessage(
  id: string,
  receiver: string,
  body: string
) {
  const server = await get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "messages/send",
    { target: btoa(receiver), id },
    get(UserToken),
    null,
    body
  );

  return !req;
}
