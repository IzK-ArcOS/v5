import account from "../../assets/fts/account.svg";
import connect from "../../assets/fts/connect.svg";
import finish from "../../assets/fts/finish.svg";
import license from "../../assets/fts/license.svg";
import mode from "../../assets/fts/mode.svg";
import wave from "../../assets/fts/wave.svg";
import ConnectToCloud from "../../lib/Page/FirstTimeSetup/Page/ConnectToCloud.svelte";
import CreateUser from "../../lib/Page/FirstTimeSetup/Page/CreateUser.svelte";
import Finish from "../../lib/Page/FirstTimeSetup/Page/Finish.svelte";
import License from "../../lib/Page/FirstTimeSetup/Page/License.svelte";
import ServerConnect from "../../lib/Page/FirstTimeSetup/Page/ServerConnect.svelte";
import Welcome from "../../lib/Page/FirstTimeSetup/Page/Welcome.svelte";
import type { State } from "../state/interfaces";
export const FTSStates = new Map<string, State>([
  [
    "welcome",
    {
      name: "Welcome",
      content: Welcome,
      attribs: {},
      key: "welcome",
      image: wave,
    },
  ],
  [
    "license",
    {
      name: "License",
      content: License,
      attribs: {},
      key: "license",
      image: license,
    },
  ],
  [
    "servconn",
    {
      name: "Choose ArcOS Mode",
      content: ServerConnect,
      attribs: {},
      key: "servconn",
      image: mode,
    },
  ],
  [
    "connecttocloud",
    {
      name: "Connect to ArcOS",
      content: ConnectToCloud,
      attribs: {},
      key: "connecttocloud",
      image: connect,
    },
  ],
  [
    "crelocalacc",
    {
      name: "Your account",
      content: CreateUser,
      attribs: {},
      key: "crelocalacc",

      image: account,
    },
  ],
  [
    "finish",
    {
      name: "Finish",
      content: Finish,
      attribs: {},
      key: "finish",
      image: finish,
    },
  ],
]);
