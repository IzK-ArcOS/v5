<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import File from "./Files/File.svelte";
</script>

{#if $UserData.sh.desktop.pinnedFiles}
  <div class="files">
    {#each $UserData.sh.desktop.pinnedFiles as file}
      <File path={file} />
    {/each}
  </div>
{/if}
