import ConnectToCloud from "../../lib/Page/FirstTimeSetup/Page/ConnectToCloud.svelte";
import CreateUser from "../../lib/Page/FirstTimeSetup/Page/CreateUser.svelte";
import Finish from "../../lib/Page/FirstTimeSetup/Page/Finish.svelte";
import ServerConnect from "../../lib/Page/FirstTimeSetup/Page/ServerConnect.svelte";
import Welcome from "../../lib/Page/FirstTimeSetup/Page/Welcome.svelte";
import wave from "../../assets/fts/wave.svg";
import mode from "../../assets/fts/mode.svg";
import connect from "../../assets/fts/connect.svg";
import account from "../../assets/fts/account.svg";
import finish from "../../assets/fts/finish.svg";
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
