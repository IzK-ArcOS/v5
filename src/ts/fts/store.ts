import Welcome from "../../lib/Page/FirstTimeSetup/Page/Welcome.svelte";
import type { State } from "../state/interfaces";
import ServerConnect from "../../lib/Page/FirstTimeSetup/Page/ServerConnect.svelte";
import CreateUser from "../../lib/Page/FirstTimeSetup/Page/CreateUser.svelte";
import Finish from "../../lib/Page/FirstTimeSetup/Page/Finish.svelte";
export const FTSStates = new Map<string, State>([
  [
    "welcome",
    {
      name: "Welcome to ArcOS",
      content: Welcome,
      attribs: {},
      key: "welcome",
    },
  ],
  [
    "servconn",
    {
      name: "Server Connect",
      content: ServerConnect,
      attribs: {},
      key: "servconn",
    },
  ],
  [
    "crelocalacc",
    {
      name: "createlocalaccount",
      content: CreateUser,
      attribs: {},
      key: "crelocalacc",
    },
  ],
  [
    "finish",
    {
      name: "finishsetup",
      content: Finish,
      attribs: {},
      key: "finish",
    },
  ],
]);
