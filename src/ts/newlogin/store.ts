import AutoLogin from "../../lib/Page/NewLogin/Pages/AutoLogin.svelte";
import ExistingUser from "../../lib/Page/NewLogin/Pages/ExistingUser.svelte";
import NewUser from "../../lib/Page/NewLogin/Pages/NewUser.svelte";
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
  [
    "existinguserauth",
    {
      name: "Existing User Login",
      content: ExistingUser,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "existinguserauth",
    },
  ],
  [
    "newuserauth",
    {
      name: "New User",
      content: NewUser,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "newuserauth",
    },
  ],
]);
