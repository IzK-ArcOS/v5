import logo from "../../../assets/apps/mediaplayer.svg";
import MediaPlayer from "../../../lib/Apps/MediaPlayer.svelte";
import { createTrayIcon, disposeTrayIcon } from "../../desktop/tray/main";
import { closeWindow, openWindow } from "../events";
import type { App } from "../interface";

export const MediaPlayerApp: App = {
  info: {
    name: "Media Player",
    description: "Play audio files",
    builtin: true,
    version: "2.0.0",
    author: "Izaak Kuipers",
    icon: logo,
    hidden: true,
    appGroup: "entertainment",
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
  fileMimes: [
    "audio/x-flac",
    "audio/wave",
    "audio/mpeg",
    "audio/x-wav",
    "audio/",
  ],
  events: {
    open: (app: App) => {
      /*  if (!app.openedFile) {
        disposeTrayIcon("MediaPlayerApp");
        return closeWindow("MediaPlayerApp");
      } */

      createTrayIcon({
        onOpen() {
          openWindow("MediaPlayerApp");
        },
        image: logo,
        identifier: "MediaPlayerApp",
      });
    },

    close() {
      disposeTrayIcon("MediaPlayerApp");
    },
  },
};
