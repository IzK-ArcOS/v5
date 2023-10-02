import { closeWindow } from "../applogic/events";
import { createOverlayableError } from "../errorlogic/overlay";
import { ArcTermIcon } from "../icon/apps";

export function initError(id: string) {
  createOverlayableError(
    {
      title: "Can't initialize terminal",
      message:
        "The terminal instance is missing a valid target element. Please restart and try again.",
      buttons: [
        {
          caption: "Close",
          action() {
            closeWindow(id);
          },
          suggested: true,
        },
      ],
      image: ArcTermIcon,
    },
    id
  );
}
