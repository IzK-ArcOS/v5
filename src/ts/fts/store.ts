import Welcome from "../../lib/Page/FirstTimeSetup/Page/Welcome.svelte";
import type { State } from "../state/interfaces";
import ServerConnect from "../../lib/Page/FirstTimeSetup/Page/ServerConnect.svelte";
import CreateUser from "../../lib/Page/FirstTimeSetup/Page/CreateUser.svelte";
export const FTSStates = new Map<string, State>([
  [
    "welcome",
    {
      name: "Welcome to ArcOS",
      content: Welcome,
      attribs: {},
    },
  ],
  [
    "servconn",
    {
      name: "Server Connect",
      content: ServerConnect,
      attribs: {},
    },
  ],
  [
    "crelocalacc",
    {
      name: "createlocalaccount",
      content: CreateUser,
      attribs: {},
    },
  ],
]);
