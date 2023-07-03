import { writable, Writable } from "svelte/store";
import type { App, Process } from "../applogic/interface";

export const ErrorMessages: Writable<ErrorMessage[]> = writable<ErrorMessage[]>(
  []
);

export const ErrorApps: Writable<{[id:string]: App}> = writable<{[id:string]: App}>({});
export const ErrorProcesses: Writable<{[pid:number]: Process}> = writable<{[pid:number]: Process}>({});

export interface ErrorMessage {
  title: string;
  message: string;
  opened: boolean;
  buttons: ErrorButton[];
  id: string;
  image?: string;
  parentId?: string;
}

export interface ErrorButton {
  caption: string;
  action: () => void;
}
