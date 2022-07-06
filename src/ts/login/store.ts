import UserLogin from "../../lib/Page/Login/Page/UserLogin.svelte";
import Selector from "../../lib/Page/Login/Page/Selector.svelte";
import type { State } from "../state/interfaces";

export const LoginStates = new Map<string, State>([
  [
    "selector",
    {
      name: "User Selector",
      content: Selector,
      attribs: {
        topbar: true,
      },
    },
  ],
  [
    "todesktop",
    {
      name: "Login Redirector -> Desktop",
      content: UserLogin,
      attribs: {
        topbar: false,
      },
    },
  ],
]);
