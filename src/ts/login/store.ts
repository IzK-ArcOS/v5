import UserLogin from "../../lib/Page/Login/Page/UserLogin.svelte";
import Selector from "../../lib/Page/Login/Page/Selector.svelte";
import Logoff from "../../lib/Page/Login/Page/Logoff.svelte";
import type { State } from "../state/interfaces";
import Restart from "../../lib/Page/Login/Page/Restart.svelte";
import Shutdown from "../../lib/Page/Login/Page/Shutdown.svelte";

export const LoginStates = new Map<string, State>([
  [
    "selector",
    {
      name: "User Selector",
      content: Selector,
      attribs: {
        topbar: true,
        darken: false,
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
        darken: true,
      },
    },
  ],
  [
    "logoff",
    {
      name: "Desktop -> Logoff -> User Selector",
      content: Logoff,
      attribs: {
        topbar: false,
        darken: true,
      },
    },
  ],
  [
    "shutdown",
    {
      name: "Desktop -> Logoff -> End",
      content: Shutdown,
      attribs: {
        topbar: false,
        darken: true,
      },
    },
  ],
  [
    "restart",
    {
      name: "Desktop -> Logoff -> Boot",
      content: Restart,
      attribs: {
        topbar: false,
        darken: true,
      },
    },
  ],
]);
