import NotImplemented from "../../../../lib/HelpCenter/NotImplemented.svelte";
import type { HelpCenterStore } from "../../interface";

export default {
  appsMessaging: {
    title: "Messaging",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "apps",
  },
  appsMessagingSending: {
    title: "Sending",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "appsMessaging",
  },
  appsMessagingReceiving: {
    title: "Receiving",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "appsMessaging",
  },
  appsMessagingDeleting: {
    title: "Deleting",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "appsMessaging",
  },
  appsMessagingReplies: {
    title: "Replies",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "appsMessaging",
  },
  appsMessagingLimitations: {
    title: "Limitations",
    authors: ["Izaak Kuipers"],
    content: NotImplemented,
    parentId: "appsMessaging",
  },
} as HelpCenterStore;
