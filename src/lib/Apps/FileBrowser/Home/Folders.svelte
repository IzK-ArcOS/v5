<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import Folder from "./Folders/Folder.svelte";
</script>

{#if $UserData.sh.desktop.pinnedFolders}
  <div class="dirs">
    {#each $UserData.sh.desktop.pinnedFolders as folder}
      <Folder path={folder} />
    {/each}
  </div>
{/if}
