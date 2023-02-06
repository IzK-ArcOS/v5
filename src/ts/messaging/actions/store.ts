import type { MessageItemAction, MsgAppActions } from "./interface";

export const messageSidebarActions: MsgAppActions = [
  {
    icon: "add",
    name: "New Message",
    action() {
      console.log("new message requested!");
    },
  },
];

export const messageItemActions: MessageItemAction[] = [
  {
    icon: "save",
    name: "Save to ArcFS",
    action() {
      console.log("save!");
    },
  },
  {
    icon: "delete",
    name: "Delete message for everyone",
    action() {
      console.log("delete!");
    },
  },
];
