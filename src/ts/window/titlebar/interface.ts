import type { SvelteComponent } from "svelte/internal";

export interface WindowControls {
  caption: string;
  author: string;
  content: SvelteComponent;
}
