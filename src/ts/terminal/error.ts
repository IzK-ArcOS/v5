import { closeWindow } from "../applogic/events";
import { createOverlayableError } from "../errorlogic/overlay";
import icon from "../../assets/apps/arcterm.svg";

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
        },
      ],
      image: icon,
    },
    id
  );
}
