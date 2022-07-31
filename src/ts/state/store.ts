import Login from "../../lib/Page/Login.svelte";
import Boot from "../../lib/Page/Boot.svelte";
import FirstTimeSetup from "../../lib/Page/FirstTimeSetup.svelte";
import Desktop from "../../lib/Page/Desktop.svelte";
import Blank from "../../lib/Page/Blank.svelte";

import type { State } from "./interfaces";
import { applyLoginState, loginUsername } from "../login/main";

export const States = new Map<string, State>([
  [
    "boot",
    {
      name: "Boot",
      content: Boot,
      attribs: {},
    },
  ],
  [
    "login",
    {
      name: "Login",
      content: Login,
      attribs: {},
    },
  ],
  [
    "fts",
    {
      name: "First Time Setup",
      content: FirstTimeSetup,
      attribs: {},
    },
  ],
  [
    "desktop",
    {
      name: "Desktop",
      content: Desktop,
      attribs: {},
    },
  ],
  [
    "logoff",
    {
      name: "Logoff",
      content: Login,
      attribs: {},
      onload: () => {
        applyLoginState("logoff");
        loginUsername.set(null);
      },
    },
  ],
  [
    "restart",
    {
      name: "Restart",
      content: Login,
      attribs: {},
      onload: () => {
        applyLoginState("restart");
        loginUsername.set(null);
      },
    },
  ],
  [
    "shutdown",
    {
      name: "Shutdown",
      content: Login,
      attribs: {},
      onload: () => {
        applyLoginState("shutdown");
        loginUsername.set(null);
      },
    },
  ],
  [
    "blank",
    {
      name: "Blank",
      content: Blank,
      attribs: {},

    }
  ]
]);
