import { get } from "svelte/store";
import { UserName } from "../userlogic/interfaces";
import type { PartialMessage } from "./interface";
import { getMessages } from "./main";

export async function getSentMessages() {
  const messages = await getMessages();

  let returnValue: PartialMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    if (messages[i].sender == get(UserName)) returnValue.push(messages[i]);
  }

  return returnValue;
}

export async function getReceivedMessages() {
  const messages = await getMessages();

  let returnValue: PartialMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    if (messages[i].receiver == get(UserName)) returnValue.push(messages[i]);
  }

  return returnValue;
}

export async function getUnreadMessages() {
  const messages = await getReceivedMessages();

  let returnValue: PartialMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    if (!messages[i].read) returnValue.push(messages[i]);
  }

  return returnValue;
}
