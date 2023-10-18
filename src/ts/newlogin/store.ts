import AutoLogin from "../../lib/Page/NewLogin/Pages/AutoLogin.svelte";
import type { State } from "../state/interfaces";

export const NewLoginStates = new Map<string, State>([
  [
    "autologin",
    {
      name: "Auto Login",
      content: AutoLogin,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "autologin",
    },
  ],
]);
