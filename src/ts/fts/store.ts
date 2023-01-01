import ConnectToCloud from "../../lib/Page/FirstTimeSetup/Page/ConnectToCloud.svelte";
import CreateUser from "../../lib/Page/FirstTimeSetup/Page/CreateUser.svelte";
import Finish from "../../lib/Page/FirstTimeSetup/Page/Finish.svelte";
import ServerConnect from "../../lib/Page/FirstTimeSetup/Page/ServerConnect.svelte";
import Welcome from "../../lib/Page/FirstTimeSetup/Page/Welcome.svelte";
import type { State } from "../state/interfaces";
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
    "connecttocloud",
    {
      name: "connecttocloud",
      content: ConnectToCloud,
      attribs: {},
      key: "conncloud",
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
