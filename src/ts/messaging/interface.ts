export type MsgDB = { [key: string]: Message };

export interface Message {
  sender: string;
  receiver: string;
  body: string;
  replies: string[];
  replyingTo?: string;
  timestamp: number;
  id?: string;
  read: boolean;
}

export interface PartialMessage {
  sender: string;
  receiver: string;
  partialBody: string;
  timestamp: number;
  replyingTo?: string;
  id?: string;
  read: boolean;
}
