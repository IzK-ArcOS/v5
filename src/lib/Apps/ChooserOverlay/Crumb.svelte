<script lang="ts">
  export let crumb: string;
  export let path: string;
  export let setDir: (path: string) => void;

  function openThis() {
    setDir(path);
  }
</script>

{#if crumb && crumb != "."}
  <button class="crumb" on:click={openThis}>
    {crumb}
  </button>
{/if}
