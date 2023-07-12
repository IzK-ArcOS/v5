import account from "../../assets/fts/account.svg";
import connect from "../../assets/fts/connect.svg";
import finish from "../../assets/fts/finish.svg";
import license from "../../assets/fts/license.svg";
import mode from "../../assets/fts/mode.svg";
import wave from "../../assets/fts/wave.svg";
import AuthMode from "../../lib/Page/FirstTimeSetup/Page/AuthMode.svelte";
import ConnectToCloud from "../../lib/Page/FirstTimeSetup/Page/ConnectToCloud.svelte";
import ExistingAuth from "../../lib/Page/FirstTimeSetup/Page/ExistingAuth.svelte";
import Finish from "../../lib/Page/FirstTimeSetup/Page/Finish.svelte";
import License from "../../lib/Page/FirstTimeSetup/Page/License.svelte";
import NewAuth from "../../lib/Page/FirstTimeSetup/Page/NewAuth.svelte";
import Welcome from "../../lib/Page/FirstTimeSetup/Page/Welcome.svelte";
import { D } from "../language/main";
import type { State } from "../state/interfaces";
export const FTSStates = new Map<string, State>([
  [
    "welcome",
    {
      name: D("fts.welcome"),
      content: Welcome,
      attribs: {},
      key: "welcome",
      image: wave,
    },
  ],
  [
    "license",
    {
      name: D("fts.license"),
      content: License,
      attribs: {},
      key: "license",
      image: license,
    },
  ],
  [
    "connecttocloud",
    {
      name: D("fts.ctc"),
      content: ConnectToCloud,
      attribs: {},
      key: "connecttocloud",
      image: connect,
    },
  ],

  [
    "authmode",
    {
      name: D("fts.authmode"),
      content: AuthMode,
      attribs: {},
      key: "authmode",
      image: mode,
    },
  ],
  [
    "auth-existing",
    {
      name: D("fts.ea"),
      content: ExistingAuth,
      attribs: {},
      key: "auth-existing",
      image: account,
    },
  ],
  [
    "auth-new",
    {
      name: D("fts.na"),
      content: NewAuth,
      attribs: {},
      key: "auth-new",
      image: account,
    },
  ],
  [
    "finish",
    {
      name: D("fts.finish"),
      content: Finish,
      attribs: {},
      key: "finish",
      image: finish,
    },
  ],
]);
