import { closeProcess } from "../applogic/events";
import { createOverlayableError } from "../errorlogic/overlay";
import icon from "../../assets/apps/arcterm.svg";

export function initError(pid: number) {
  createOverlayableError(
    {
      title: "Can't initialize terminal",
      message:
        "The terminal instance is missing a valid target element. Please restart and try again.",
      buttons: [
        {
          caption: "Close",
          action() {
            closeProcess(pid);
          },
        },
      ],
      image: icon,
    },
    pid
  );
}
