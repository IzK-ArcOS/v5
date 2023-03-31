import connect from "../../assets/fts/connect.svg";
import finish from "../../assets/fts/finish.svg";
import license from "../../assets/fts/license.svg";
import account from "../../assets/fts/account.svg";
import wave from "../../assets/fts/wave.svg";
import Auth from "../../lib/Page/FirstTimeSetup/Page/Auth.svelte";
import ConnectToCloud from "../../lib/Page/FirstTimeSetup/Page/ConnectToCloud.svelte";
import Finish from "../../lib/Page/FirstTimeSetup/Page/Finish.svelte";
import License from "../../lib/Page/FirstTimeSetup/Page/License.svelte";
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
    "authform",
    {
      name: "Authenticate",
      content: Auth,
      attribs: {},
      key: "authform",
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
