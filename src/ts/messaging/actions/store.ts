import { createDirectory } from "../../api/fs/directory";
import { writeFile } from "../../api/fs/file";
import {
  fbClass,
  FileBrowserSelectedFilename,
} from "../../applogic/apps/FileBrowser/main";
import { openWindow } from "../../applogic/events";
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
    async action(message: Message) {
      const blob = new Blob([message.body], { type: "text/markdown" });

      await createDirectory("./Messages");

      const filename = `Message from ${message.sender} - ${message.id}.md`;
      const path = `./Messages/${filename}`;

      await writeFile(path, blob);

      openWindow("FileManager");

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
      await deleteMessage(message.id);
      messageUpdateTrigger();
      selectedMessageId.set(null);
    },
  },
];
