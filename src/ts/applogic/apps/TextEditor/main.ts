import { get, writable } from "svelte/store";
import { writeFile } from "../../../api/fs/file";
import { closeFile } from "../../../api/fs/main";
import { openWith } from "../../../api/fs/open";
import { showOpenFileDialog } from "../../../chooser/main";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { closeWindow, openWindow } from "../../events";
import type { App, ArcFile } from "../../interface";
import { registerShortcuts } from "../../keyboard/main";

export const TextEditorContent = writable<string>(null);

export async function saveTextEditorFile(
  textContent: string,
  openedFile: ArcFile
) {
  const data = new Blob([textContent]);

  await writeFile(openedFile.path, data);
}

export async function setShortcuts(app: App, save: () => void) {
  registerShortcuts(
    [
      {
        key: "o",
        alt: true,
        action: () => {
          showOpenFileDialog(app.id);
        },
      },
      {
        key: "m",
        alt: true,
        action: () => {
          if (!app.openedFile || !app.openedFile.name.endsWith(".md")) return;

          openWindow("MarkDownViewer");
          closeFile("MarkDownViewer");
        },
      },
      {
        key: "s",
        alt: true,
        action: save,
      },
    ],
    "TextEditor"
  );

  app.events.close = () => {
    if (get(TextEditorContent)) {
      closeWindow("MarkDownViewer");
    }
  };
}

export async function doLoadError(title: string, message: string) {
  return createOverlayableError(
    {
      title: title,
      message: message,
      buttons: [{ caption: "Close", action: () => closeWindow("TextEditor") }],
    },
    "TextEditor"
  );
}
