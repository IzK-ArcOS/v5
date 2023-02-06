import type { Message } from "../interface";

export interface MessageAppAction {
  icon: string;
  name: string;
  action: () => void;
}

export interface MessageItemAction {
  icon: string;
  name: string;
  action: (message: Message) => void;
}

export type MsgAppActions = MessageAppAction[];
