import type { ArcFile, PartialArcFile } from "../../../api/interface";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { ErrorIcon } from "../../../icon/apps";
import { FileIcon, TrashIcon } from "../../../icon/general";
import { fbClass } from "./main";

export function DirectoryNotFound(path: string) {
  createOverlayableError(
    {
      title: "Directory not found",
      message: `ArcOS was unable to open <code>${path}</code>: the directory doesn't exist.`,
      buttons: [
        {
          caption: "Go Home",
          action() {
            fbClass.goToDirectory("./");
          },
          suggested: true,
        },
      ],
      image: ErrorIcon,
    },
    "FileManager"
  );
}

export function DeleteFailed() {
  createOverlayableError(
    {
      title: "Unable to delete item",
      message:
        "ArcAPI was not able to delete the item from the file system. A permission error may have occured. Please try again later.",
      buttons: [{ caption: "OK", action() {}, suggested: true }],
      image: TrashIcon,
    },
    "FileManager"
  );
}

export function FileOpenFailed(file: PartialArcFile, x: ArcFile) {
  createOverlayableError(
    {
      title: `Unable to open ${file.filename}`,
      message:
        "You don't have an app or handler that can open this type of file.",
      buttons: [
        {
          caption: "Close",
          action: () => {},
          suggested: true,
        },
        {
          caption: "Open With...",
          action: () => this.openWithAny(x),
        },
      ],
      image: FileIcon,
    },
    "FileManager"
  );
}

export function OpenCancelled() {
  createOverlayableError(
    {
      title: "Open cancelled",
      message: "The opening procedure was cancelled by the user.",
      buttons: [{ caption: "OK", action() {}, suggested: true }],
      image: ErrorIcon,
    },
    "FileManager"
  );
}
