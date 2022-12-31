<script lang="ts">
  import { onMount } from "svelte";
  import { UserData } from "../../../../../ts/userlogic/interfaces";

  let url: string;

  function load() {
    $UserData.sh.desktop.wallpaper = url;
  }

  onMount(() => {
    if (!$UserData.sh.desktop.wallpaper.startsWith("img")) {
      url = $UserData.sh.desktop.wallpaper;
    }
  });
</script>

<div class="customurl">
  <p>Or, enter the URL to a custom wallpaper:</p>
  <input bind:value={url} />
  <button on:click={load} disabled={!url}>Load</button>
</div>
