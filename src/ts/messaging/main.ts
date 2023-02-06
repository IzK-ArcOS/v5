import { get } from "svelte/store";
import { apiCall, ConnectedServer } from "../api/main";
import { UserToken } from "../userlogic/interfaces";
import type { Message, PartialMessage } from "./interface";

export async function getMessages(): Promise<PartialMessage[]> {
  const server = get(ConnectedServer);

  if (!server) return [];

  const req = await apiCall(server, "messages/list", {}, get(UserToken));

  if (!req.valid) return [];

  return req.data as PartialMessage[];
}

export async function getMessage(id: string): Promise<Message | false> {
  const server = get(ConnectedServer);

  if (!server) return false;

  const req = await apiCall(
    server,
    "messages/get",
    {
      id: btoa(id),
    },
    get(UserToken)
  );

  if (!req.valid) return false;

  return req.data as Message;
}
