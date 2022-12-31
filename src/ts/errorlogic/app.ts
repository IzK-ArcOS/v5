import { writable, Writable } from "svelte/store";
import type { App } from "../applogic/interface";

export const ErrorMessages: Writable<ErrorMessage[]> = writable<ErrorMessage[]>(
  []
);

export const ErrorWindowStore: Writable<App[]> = writable<App[]>([]);

export interface ErrorMessage {
  title: string;
  message: string;
  opened: boolean;
  buttons: ErrorButton[];
  id: number;
  image?: string;
}

export interface ErrorButton {
  caption: string;
  action: () => void;
}
