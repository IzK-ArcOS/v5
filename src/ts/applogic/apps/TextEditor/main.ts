import { writable } from "svelte/store";
import { writeFile } from "../../../api/fs/file";
import type { ArcFile } from "../../../api/interface";
import { showOpenFileDialog } from "../../../chooser/main";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { closeWindow } from "../../events";
import type { App } from "../../interface";
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
        key: "s",
        alt: true,
        action: save,
      },
    ],
    "TextEditor"
  );
}

export async function doLoadError(title: string, message: string) {
  return createOverlayableError(
    {
      title: title,
      message: message,
      buttons: [
        {
          caption: "Close",
          action: () => closeWindow("TextEditor"),
          suggested: true,
        },
      ],
    },
    "TextEditor"
  );
}
