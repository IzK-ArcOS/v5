import AutoLogin from "../../lib/Page/NewLogin/Pages/AutoLogin.svelte";
import ExistingUser from "../../lib/Page/NewLogin/Pages/ExistingUser.svelte";
import NewUser from "../../lib/Page/NewLogin/Pages/NewUser.svelte";
import Selector from "../../lib/Page/NewLogin/Pages/Selector.svelte";
import flush from "../login/flush";
import type { State } from "../state/interfaces";
import { applyState } from "../state/main";

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
  [
    "selector",
    {
      name: "Selector",
      content: Selector,
      attribs: {
        topbar: true,
        darken: false,
        className: "center-flex",
      },
      key: "selector",
    },
  ],
  [
    "shutdown",
    {
      name: "Shutdown",
      content: AutoLogin,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "shutdown",
      onload() {
        setTimeout(() => {
          applyState("turnedoff");
        }, 2000);
      },
    },
  ],
  [
    "restart",
    {
      name: "Restart",
      content: AutoLogin,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "restart",
      onload() {
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
    },
  ],
  [
    "logoff",
    {
      name: "Logoff",
      content: AutoLogin,
      attribs: {
        topbar: false,
        darken: true,
        className: "center-flex",
      },
      key: "logoff",
      onload() {
        //localStorage.removeItem("arcos-remembered-token");

        setTimeout(() => {
          flush();

          location.reload();
        }, 2000);
      },
    },
  ],
]);
