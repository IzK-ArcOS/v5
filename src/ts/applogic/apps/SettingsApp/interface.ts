import type { SvelteComponent } from "svelte";
import type { SvelteComponentDev } from "svelte/internal";

export interface SettingsPage {
  name: string;
  icon: string;
  content: typeof SvelteComponentDev;
  sep?: boolean;
  disabled?: boolean;
}
