import { get, writable } from "svelte/store";
import { writeFile } from "../../../api/fs/file";
import { closeFile } from "../../../api/fs/main";
import { openWith } from "../../../api/fs/open";
import { showOpenFileDialog } from "../../../chooser/main";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { closeProcess, createProcess } from "../../events";
import type { Process } from "../../interface";
import { registerShortcuts } from "../../keyboard/main";
import type { ArcFile } from "../../../api/interface";

export const TextEditorContent = writable<string>(null);

export async function saveTextEditorFile(
  textContent: string,
  openedFile: ArcFile
) {
  const data = new Blob([textContent]);

  await writeFile(openedFile.path, data);
}

export async function setShortcuts(process: Process, save: () => void) {
  registerShortcuts(process.id,
    [
      {
        key: "o",
        alt: true,
        action: () => {
          showOpenFileDialog(process.id);
        },
      },
      {
        key: "m",
        alt: true,
        action: () => {
          if (!process.openedFile || !process.openedFile.name.endsWith(".md")) return;

          createProcess(process.app.id);
          closeFile(process.id);
        },
      },
      {
        key: "s",
        alt: true,
        action: save,
      },
    ]
  );

  process.app.events.close = () => {
    if (get(TextEditorContent)) {
      closeProcess(process.id);
    }
  };
}

export async function doLoadError(pid: number, title: string, message: string) {
  return createOverlayableError(
    {
      title: title,
      message: message,
      buttons: [{ caption: "Close", action: () => closeProcess(pid) }],
    },
    pid
  );
}
