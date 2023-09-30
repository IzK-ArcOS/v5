import { get } from "svelte/store";
import { apiCall, ConnectedServer } from "../api/main";
import { UserToken } from "../userlogic/interfaces";
import { toBase64 } from "../base64";

export async function sendMessage(receiver: string, body: string) {
  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "messages/send",
    { target: toBase64(receiver) },
    get(UserToken),
    null,
    body
  );

  return req.data.id;
}

export async function sendMultipleMessages(
  receivers: string[],
  body: string
): Promise<boolean> {
  for (let i = 0; i < receivers.length; i++) {
    try {
      if (!(await sendMessage(receivers[i], body))) return false;
    } catch {
      return false;
    }
  }

  return true;
}

export async function replyToMessage(
  id: string,
  receiver: string,
  body: string
) {
  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "messages/reply",
    { target: toBase64(receiver), id },
    get(UserToken),
    null,
    body
  );

  return !req;
}
