import type { SvelteComponent } from "svelte";

export interface SettingsPage {
  name: string;
  icon: string;
  content: typeof SvelteComponent;
  sep?: boolean;
  disabled?: boolean;
}
