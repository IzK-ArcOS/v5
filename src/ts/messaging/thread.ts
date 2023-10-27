import { get } from "svelte/store";
import { apiCall, ConnectedServer } from "../api/main";
import { UserToken } from "../userlogic/interfaces";
import type { Message, PartiallyExtendedMessage } from "./interface";
import { getMessage, getMessages } from "./main";
import { toBase64 } from "../base64";

export async function getFullTree(): Promise<PartiallyExtendedMessage[]> {
  const server = get(ConnectedServer);

  if (!server) return [];

  const req = await apiCall(server, "messages/thread", {}, get(UserToken));

  const messages = req.data as PartiallyExtendedMessage[];

  return messages;
}

export async function getPartialTree(
  id: string
): Promise<PartiallyExtendedMessage | false> {
  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "messages/thread",
    { id: toBase64(id) },
    get(UserToken)
  );

  const message = req.data as PartiallyExtendedMessage;

  return message;
}

export async function getParentMessage(id: string): Promise<Message> {
  const messages = await getMessages();

  let replier: string;

  for (let i = 0; i < messages.length; i++) {
    if (messages[i].id == id) replier = messages[i].replyingTo;
  }

  if (!replier) return;

  const parent = (await getMessage(replier)) as Message;

  if (parent.replyingTo) return await getParentMessage(replier);

  return parent;
}
