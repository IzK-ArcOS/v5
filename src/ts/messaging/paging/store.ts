import { writable } from "svelte/store";
import {
  getReceivedMessages,
  getSentMessages,
  getUnreadMessages,
} from "../get";
import { creatingMessage, selectedMessageId } from "../main";
import { messageUpdateTrigger } from "../updates";
import type { MessagingPage, MsgPages } from "./interface";

export const messagingPage = writable<MessagingPage>(null);

messagingPage.subscribe(() => {
  setTimeout(messageUpdateTrigger, 100);
});

selectedMessageId.subscribe(() => {
  messageUpdateTrigger();
  creatingMessage.set(false);
});

export const MessagingPages: MsgPages = {
  unread: {
    name: "Unread",
    icon: "mark_email_unread",
    msgGetter: getUnreadMessages,
  },
  inbox: {
    name: "Inbox",
    icon: "inbox",
    msgGetter: getReceivedMessages,
  },
  sent: {
    name: "Sent",
    icon: "send",
    msgGetter: getSentMessages,
  },
};
