import type { SvelteComponentDev } from "svelte/internal";
import type { PartialMessage } from "../interface";

export interface MessagingPage {
  name: string;
  icon: string;
  content: typeof SvelteComponentDev;
  msgGetter: () => Promise<PartialMessage[]>;
}

export type MsgPages = { [key: string]: MessagingPage };
