import type { Message } from "../interface";
import { creatingMessage, selectedMessageId } from "../main";
import { deleteMessage } from "../mutate";
import { messageUpdateTrigger } from "../updates";
import type { MessageItemAction, MsgAppActions } from "./interface";

export const messageSidebarActions: MsgAppActions = [
  {
    icon: "add",
    name: "New Message",
    action() {
      creatingMessage.set(true);
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
    async action(message: Message) {
      await deleteMessage(message.id);
      messageUpdateTrigger();
      selectedMessageId.set(null);
    },
  },
];
