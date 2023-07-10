import type { SoundStore } from "./interface";
import dialogError from "../../assets/audio/Error.wav";
import dialogWarning from "../../assets/audio/Warning.wav";
import dialogInfo from "../../assets/audio/Info.wav";
import notification from "../../assets/audio/Notification.wav";
import systemLogon from "../../assets/audio/logon.wav";
import systemLogoff from "../../assets/audio/logoff.wav";
import click from "../../assets/audio/click.wav";
import mwomp from "../../assets/audio/mwomp.mp3";

export const ArcSounds: SoundStore = {
  "arcos.dialog.error": dialogError,
  "arcos.dialog.warning": dialogWarning,
  "arcos.dialog.info": dialogInfo,
  "arcos.notification": notification,
  "arcos.system.logon": systemLogon,
  "arcos.system.logoff": systemLogoff,
  "arcos.click": click,
  "arcos.mwomp": mwomp,
};
