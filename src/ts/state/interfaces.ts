import type { SvelteComponent } from "svelte";
import type { SvelteComponentDev } from "svelte/internal";

export interface State {
  name: string;
  content: typeof SvelteComponentDev | any;
  attribs: { [key: string]: boolean | string | number };
  key: string;
  onload?: () => void;
  image?: string;
}
