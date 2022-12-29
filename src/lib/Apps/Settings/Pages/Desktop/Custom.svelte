<script lang="ts">
  import { UserData } from "../../../../../ts/userlogic/interfaces";

  let url: string;

  function load() {
    $UserData.sh.desktop.wallpaper = url;
  }
</script>

<div class="customurl">
  <p>Or, enter the URL to a custom wallpaper:</p>
  <input bind:value={url} />
  <button on:click={load} disabled={!url}>Load</button>
</div>
