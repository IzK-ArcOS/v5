<script lang="ts">
  import { onMount } from "svelte";
  import type { Login } from "../../../ts/newlogin/main";
  import type { State } from "../../../ts/state/interfaces";
  import { getWallpaper } from "../../../ts/userlogic/wallpapers/main";

  export let state: State;
  export let runtime: Login;

  let style = "img15";

  $: style;

  onMount(() =>
    runtime.userBackground.subscribe(async (v) => {
      const wallpaper = await getWallpaper(v || "img15", "img15");

      style = `--bg: url(${wallpaper.url});`;
    })
  );
</script>

{#if state}
  <div
    class="background fullscreen"
    {style}
    class:zoom={state.attribs.darken}
  />
{/if}
