import { closeWindow } from "../applogic/events";
import { createOverlayableError } from "../errorlogic/overlay";
import icon from "../../assets/apps/arcterm.svg";
import { D } from "../language/main";

export function initError(id: string) {
  createOverlayableError(
    {
      title: D("at.initError.title"),
      message: D("at.initError.message"),
      buttons: [
        {
          caption: D("at.initError.close"),
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
