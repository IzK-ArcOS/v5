import type { SvelteComponent } from "svelte";

export interface State {
  name: string;
  content: SvelteComponent | any;
  attribs: { [key: string]: boolean | string | number };
  onload?: () => void;
}
