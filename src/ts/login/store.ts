import AutoLogin from "../../lib/Page/Login/Page/AutoLogin.svelte";
import Logoff from "../../lib/Page/Login/Page/Logoff.svelte";
import Restart from "../../lib/Page/Login/Page/Restart.svelte";
import Selector from "../../lib/Page/Login/Page/Selector.svelte";
import Shutdown from "../../lib/Page/Login/Page/Shutdown.svelte";
import UserLogin from "../../lib/Page/Login/Page/UserLogin.svelte";
import type { State } from "../state/interfaces";

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
      key: "selector",
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
      key: "todesktop",
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
      key: "logoff",
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
      key: "shutdown",
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
      key: "restart",
    },
  ],
  /* [
    "newapiuser",
    {
      name: "New User",
      content: NewApiUser,
      attribs: {
        topbar: false,
        darken: true,
      },
      key: "newapiuser",
    },
  ], */
  [
    "autologin",
    {
      name: "Auto Login",
      content: AutoLogin,
      attribs: {
        topbar: false,
        darken: true,
      },
      key: "autologin",
    },
  ],
]);
