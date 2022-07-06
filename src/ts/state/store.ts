import Login from "../../lib/Page/Login.svelte";
import Boot from "../../lib/Page/Boot.svelte";
import type { State } from "./interfaces";

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
]);
