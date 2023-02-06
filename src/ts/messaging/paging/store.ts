import { writable } from "svelte/store";
import Unread from "../../../lib/Apps/MessagingApp/Pages/Unread.svelte";
import { getSentMessages, getUnreadMessages } from "../get";
import { getMessages } from "../main";
import type { MessagingPage, MsgPages } from "./interface";

export const messagingPage = writable<MessagingPage>(null);

export const MessagingPages: MsgPages = {
  unread: {
    name: "Unread",
    icon: "mark_email_unread",
    content: Unread,
    msgGetter: getUnreadMessages,
  },
  inbox: {
    name: "Inbox",
    icon: "inbox",
    content: Unread,
    msgGetter: getMessages,
  },
  sent: {
    name: "Sent",
    icon: "send",
    content: Unread,
    msgGetter: getSentMessages,
  },
};
