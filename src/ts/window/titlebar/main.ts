import { UserData } from "../../userlogic/interfaces";
import { titlebarButtons } from "./store";

export async function setTitlebarButtons(selector: string): Promise<boolean> {
  if (!titlebarButtons[selector]) return false;

  UserData.update((udata) => {
    udata.sh.window.buttons = selector;

    return udata;
  });

  return true;
}
