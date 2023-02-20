import logo from "../../../assets/apps/mediaplayer.svg";
import MediaPlayer from "../../../lib/Apps/MediaPlayer.svelte";
import { closeWindow } from "../events";
import type { App } from "../interface";

export const MediaPlayerApp: App = {
  info: {
    name: "Media Player",
    description: "Play audio files",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    icon: logo,
    hidden: true,
  },
  size: { w: 442, h: NaN },
  pos: { x: 100, y: 100 },
  minSize: { w: 442, h: NaN },
  maxSize: { w: 442, h: NaN },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: MediaPlayer,
  glass: true,
  fileMimes: ["audio/x-flac", "audio/wave", "audio/mpeg"],
  events: {
    open: (app: App) => {
      if (!app.openedFile) closeWindow("MediaPlayerApp");
    },
  },
};
