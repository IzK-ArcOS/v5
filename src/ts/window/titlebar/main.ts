import { get } from "svelte/store";
import { UserData } from "../../userlogic/interfaces";
import { titlebarButtons } from "./store";

export async function setTitlebarButtons(selector: string): Promise<boolean> {
  if (!titlebarButtons[selector]) return false;

  const udata = get(UserData);

  udata.sh.window.buttons = selector;

  UserData.set(udata);

  return true;
}
