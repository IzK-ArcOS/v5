import ConnectToCloud from "../../lib/Page/FirstTimeSetup/Page/ConnectToCloud.svelte";
import Finish from "../../lib/Page/FirstTimeSetup/Page/Finish.svelte";
import License from "../../lib/Page/FirstTimeSetup/Page/License.svelte";
import Updates from "../../lib/Page/FirstTimeSetup/Page/Updates.svelte";
import Welcome from "../../lib/Page/FirstTimeSetup/Page/Welcome.svelte";
import {
  ConnectIcon,
  FlagIcon,
  SecureIcon,
  UpdateIcon,
  WaveIcon,
} from "../icon/main";
import type { State } from "../state/interfaces";
export const FTSStates = new Map<string, State>([
  [
    "welcome",
    {
      name: "Welcome",
      content: Welcome,
      attribs: {},
      key: "welcome",
      image: WaveIcon,
    },
  ],
  [
    "updates",
    {
      name: "Check for Updates",
      content: Updates,
      attribs: {},
      key: "updates",
      image: UpdateIcon,
    },
  ],
  [
    "license",
    {
      name: "License",
      content: License,
      attribs: {},
      key: "license",
      image: SecureIcon,
    },
  ],
  [
    "connecttocloud",
    {
      name: "Connect to ArcOS",
      content: ConnectToCloud,
      attribs: {},
      key: "connecttocloud",
      image: ConnectIcon,
    },
  ],
  /* 
  [
    "authmode",
    {
      name: "User Mode",
      content: AuthMode,
      attribs: {},
      key: "authmode",
      image: mode,
    },
  ],
  [
    "auth-existing",
    {
      name: "Existing User",
      content: ExistingAuth,
      attribs: {},
      key: "auth-existing",
      image: account,
    },
  ],
  [
    "auth-new",
    {
      name: "Create Account",
      content: NewAuth,
      attribs: {},
      key: "auth-new",
      image: account,
    },
  ], */
  [
    "finish",
    {
      name: "Finish",
      content: Finish,
      attribs: {},
      key: "finish",
      image: FlagIcon,
    },
  ],
]);
