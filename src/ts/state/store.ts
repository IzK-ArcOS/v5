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
      key: "boot",
    },
  ],
  [
    "login",
    {
      name: "Login",
      content: Login,
      attribs: {},
      key: "login",
    },
  ],
  [
    "fts",
    {
      name: "First Time Setup",
      content: FirstTimeSetup,
      attribs: {},
      key: "fts",
    },
  ],
  [
    "desktop",
    {
      name: "Desktop",
      content: Desktop,
      attribs: {},
      key: "desktop",
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
      key: "logoff",
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
      key: "restart",
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
      key: "shutdown",
    },
  ],
  [
    "blank",
    {
      name: "Blank",
      content: Blank,
      attribs: {},
      key: "blank",
    },
  ],
]);
