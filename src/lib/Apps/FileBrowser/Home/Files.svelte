<script lang="ts">
  import sleep from "../../../../ts/sleep";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import File from "./Files/File.svelte";

  let files: string[] = [];

  UserData.subscribe(async (v) => {
    const newFiles = v.sh.desktop.pinnedFiles;

    files = [];

    await sleep(0);

    files = newFiles;
  });
</script>

{#if files}
  {#if !files.length}
    <p class="no-files">Files you pin will appear here.</p>
  {/if}
  <div class="files">
    {#each files as file}
      <File path={file} />
    {/each}
  </div>
{/if}
