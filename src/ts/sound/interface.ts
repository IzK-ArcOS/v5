import type { Params } from "../api/interface";

export type SoundStore = Params;

export type SoundBusStore = { [key: string]: HTMLAudioElement[] };
