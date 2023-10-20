<script lang="ts">
  import sleep from "../../../../ts/sleep";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import Folder from "./Folders/Folder.svelte";

  let folders: string[] = [];

  UserData.subscribe(async (v) => {
    const newFolders = v.sh.desktop.pinnedFolders;

    folders = null;

    await sleep(0);

    folders = newFolders;
  });
</script>

{#if !folders || !folders.length}
  <p class="no-folders">Folders you pin will appear here.</p>
{/if}
{#if folders}
  <div class="dirs" class:collapsed={!folders.length}>
    {#each folders as folder}
      <Folder path={folder} />
    {/each}
  </div>
{/if}
