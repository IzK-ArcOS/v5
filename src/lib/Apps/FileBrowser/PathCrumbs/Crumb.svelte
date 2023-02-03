<script lang="ts">
  import { fbClass } from "$$ts/applogic/apps/FileBrowser/main";

  export let crumb: string;
  export let path: string;

  function openThis() {
    fbClass.goToDirectory(path);
  }
</script>

{#if crumb && crumb != "."}
  <button class="crumb" on:click={openThis}>
    {crumb}
  </button>
{/if}
