<script lang="ts">
  import { onMount } from "svelte";
  import type { App } from "../../../../ts/applogic/interface";
  import type { SideloadedApp } from "../../../../ts/applogic/sideloading/interface";
  import { getSideload } from "../../../../ts/applogic/sideloading/store";
  import Window from "./Window.svelte";

  export let visible = false;
  export let max = false;
  export let isBoot = false;
  export let tag: string;
  export let app: App;

  // NON-STANDARD
  let sideload: SideloadedApp;

  onMount(() => {
    const sl = getSideload(tag);

    if (!sl) return;

    sideload = sl;
  });
</script>

{#if sideload && app}
  <Window {app} {visible} {max} {isBoot}>
    {@html `<${tag}/>`}
  </Window>
{/if}
