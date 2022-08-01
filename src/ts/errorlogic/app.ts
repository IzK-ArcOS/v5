import { writable, Writable } from "svelte/store";

export const ErrorMessages: Writable<ErrorMessage[]> = writable<ErrorMessage[]>(
  []
);

export interface ErrorMessage {
  title: string;
  message: string;
  opened: boolean;
  buttons: ErrorButton[];
}

export interface ErrorButton {
    caption: string;
    action: () => void;
}
