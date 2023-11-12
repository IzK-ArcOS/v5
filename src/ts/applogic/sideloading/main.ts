import { manualCrash } from "../../reporting/crash";
import type { SideloadedApp } from "./interface";
import { SideloadedStore } from "./store";

export function Sideload({ tag, module }: SideloadedApp) {
  SideloadedStore.update((store) => {
    store.push({ tag, module });

    return store;
  });

  try {
    import(/* @vite-ignore */ module);
  } catch (e) {
    manualCrash(
      "sideloading/main.ts: Sideload",
      "Loading app module failed, CORS?",
      e?.stack!
    );
  }
}
