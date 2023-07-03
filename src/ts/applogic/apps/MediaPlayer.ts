import { get } from "svelte/store";
import logo from "../../../assets/apps/mediaplayer.svg";
import MediaPlayer from "../../../lib/Apps/MediaPlayer.svelte";
import { createTrayIcon, disposeTrayIcon } from "../../desktop/tray/main";
import { closeProcess, createProcess } from "../events";
import type { App } from "../interface";
import { ProcessStore } from "../store";

export const MediaPlayerApp: App = {
  info: {
    name: "Media Player",
    description: "Play audio files",
    builtin: true,
    version: "2.0.0",
    author: "Izaak Kuipers",
    icon: logo,
    hidden: true,
  },
  initialSize: { w: 442, h: NaN },
  minSize: { w: 442, h: NaN },
  maxSize: { w: 442, h: NaN },
  controls: { minimized: true, maximized: false, close: true },
  windowProperties: {
    headless: false,
    resizable: false,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  content: MediaPlayer,
  glass: true,
  fileMimes: ["audio/x-flac", "audio/wave", "audio/mpeg"],
  events: {
    open(pid: number) {
      const process = get(ProcessStore)[pid];

      if (!process.openedFile) {
        disposeTrayIcon("MediaPlayerApp");
        return closeProcess(pid);
      }

      createTrayIcon({
        onOpen() {
          createProcess("MediaPlayerApp");
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
