import { createDirectory } from "../../api/fs/directory";
import { writeFile } from "../../api/fs/file";
import {
  fbClass,
  FileBrowserSelectedFilename,
} from "../../applogic/apps/FileBrowser/main";
import { createProcess } from "../../applogic/events";
import { createOverlayableError } from "../../errorlogic/overlay";
import type { Message } from "../interface";
import { creatingMessage, replyMessageId, selectedMessageId } from "../main";
import { deleteMessage } from "../mutate";
import { messageUpdateTrigger } from "../updates";
import type { MessageItemAction, MsgAppActions } from "./interface";
import icon from "../../../assets/apps/error.svg";
import { getPID } from "../../applogic/pid";

export const messageSidebarActions: MsgAppActions = [
  {
    icon: "add",
    name: "New Message",
    action() {
      replyMessageId.set(null);
      creatingMessage.set(true);
    },
  },
];

export const messageItemActions: MessageItemAction[] = [
  {
    icon: "reply",
    name: "Reply",
    async action(message: Message) {
      replyMessageId.set(message.id);
      creatingMessage.set(true);
    },
  },
  {
    icon: "save",
    name: "Save to ArcFS",
    async action(message: Message) {
      const blob = new Blob([message.body], { type: "text/markdown" });

      await createDirectory("./Messages");

      const filename = `Message from ${message.sender} - ${message.id}.md`;
      const path = `./Messages/${filename}`;

      await writeFile(path, blob);

      createProcess("FileManager");

      await fbClass.goToDirectory("./Messages");

      setTimeout(() => {
        FileBrowserSelectedFilename.set(filename);
      });
    },
  },
  {
    icon: "delete",
    name: "Delete message for everyone",
    async action(message: Message) {
      createOverlayableError(
        {
          title: "Delete message?",
          message: `Are you sure you want to delete this message from ${message.sender}? This cannot be undone.`,
          image: icon,
          buttons: [
            {
              caption: "Delete",
              action: async () => {
                await deleteMessage(message.id);
                messageUpdateTrigger();
                selectedMessageId.set(null);
              },
            },
            { caption: "Cancel", action: () => {} },
          ],
        },
        getPID("MessagingApp")
      );
    },
  },
];
