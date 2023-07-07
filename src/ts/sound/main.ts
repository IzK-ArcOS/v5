import { Log } from "../console";
import { LogLevel } from "../console/interface";
import type { SoundBusStore, SoundStore } from "./interface";
import { ArcSounds } from "./store";

export class SoundBus {
  private store: SoundStore = {};
  private _bus: SoundBusStore = {};

  constructor(store: SoundStore) {
    if (!store) {
      Log({
        source: "sound/main.ts",
        msg: `Can't create SoundBus without valid store.`,
        level: LogLevel.error,
      });
      return;
    }

    this.store = store;
  }

  public playSound(id: string) {
    if (!this.store[id] || this._bus[id]) return false;

    Log({
      source: "sound/main.ts",
      msg: `Playing sound ${id} from store`,
      level: LogLevel.info,
    });

    const element = document.createElement("audio");

    element.volume = 1;
    element.src = this.store[id];
    element.play();

    this._bus[id] = element;

    element.onended = () => delete this._bus[id];
  }

  public stopSound(id: string) {
    if (!this._bus[id]) return false;

    this._bus[id].src = null;
    this._bus[id].currentTime = -1;
    this._bus[id].pause();
  }
}

export const ArcSoundBus = new SoundBus(ArcSounds);
