import { writable } from "svelte/store";

export interface BugReport {
  icon: string;
  title: string;
  message: string;
  details?:string;
  button?: {
    action: () => void;
    caption: string;
  };
}

export const BugReportData = writable<[boolean, BugReport]>();
