import ArcTerm from "../../lib/Page/ArcTerm.svelte";
import Blank from "../../lib/Page/Blank.svelte";
import Boot from "../../lib/Page/Boot.svelte";
import Crash from "../../lib/Page/Crash.svelte";
import Desktop from "../../lib/Page/Desktop.svelte";
import FirstTimeSetup from "../../lib/Page/FirstTimeSetup.svelte";
import Login from "../../lib/Page/Login.svelte";
import NewLogin from "../../lib/Page/NewLogin.svelte";
import ServerSelect from "../../lib/Page/ServerSelect.svelte";
import TurnedOff from "../../lib/Page/TurnedOff.svelte";
import { ArcSoundBus } from "../sound/main";
import type { State } from "./interfaces";

export const States = new Map<string, State>([
  [
    "boot",
    {
      name: "Booting...",
      content: Boot,
      attribs: {},
      key: "boot",
    },
  ],
  [
    "serverselect",
    {
      name: "Server Select",
      content: ServerSelect,
      attribs: {},
      key: "serverselect",
    },
  ],
  [
    "oldlogin",
    { name: "Old Login", content: Login, attribs: {}, key: "oldlogin" },
  ],
  [
    "login",
    {
      name: "Login",
      content: NewLogin,
      attribs: {},
      key: "login",
    },
  ],
  [
    "fts",
    {
      name: "First Time Setup",
      content: FirstTimeSetup,
      attribs: {},
      key: "fts",
    },
  ],
  [
    "desktop",
    {
      name: "Desktop",
      content: Desktop,
      attribs: {},
      key: "desktop",
    },
  ],
  [
    "logoff",
    {
      name: "Logoff",
      content: NewLogin,
      attribs: {
        continuation: "logoff",
      },
      key: "logoff",
      onload() {
        ArcSoundBus.playSound("arcos.system.logoff");
      },
    },
  ],
  [
    "restart",
    {
      name: "Restart",
      content: NewLogin,
      attribs: {
        continuation: "restart",
      },
      key: "restart",
      onload() {
        ArcSoundBus.playSound("arcos.system.logoff");
      },
    },
  ],
  [
    "shutdown",
    {
      name: "Shutdown",
      content: NewLogin,
      attribs: {
        continuation: "shutdown",
      },
      key: "shutdown",
      onload() {
        ArcSoundBus.playSound("arcos.system.logoff");
      },
    },
  ],
  [
    "arcterm",
    {
      name: "ArcTerm",
      content: ArcTerm,
      attribs: {},
      key: "arcterm",
    },
  ],
  [
    "crash",
    {
      name: "Aw, snap!",
      content: Crash,
      attribs: {},
      key: "crash",
    },
  ],
  [
    "blank",
    {
      name: "",
      content: Blank,
      attribs: {},
      key: "blank",
    },
  ],
  [
    "turnedoff",
    {
      name: "Turned off",
      content: TurnedOff,
      attribs: {},
      key: "turnedoff",
      onload() {
        window.close();
      },
    },
  ],
]);
