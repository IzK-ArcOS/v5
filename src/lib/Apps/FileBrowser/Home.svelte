<script lang="ts">
  import { UserData } from "../../../ts/userlogic/interfaces";
  import File from "./Home/File.svelte";
  import Folder from "./Home/Folder.svelte";
</script>

<div class="filebrowser-home">
  {#if $UserData.sh.desktop.pinnedFolders}
    <div class="dirs">
      {#each $UserData.sh.desktop.pinnedFolders as folder}
        <Folder path={folder} />
      {/each}
    </div>
  {/if}
  {#if $UserData.sh.desktop.pinnedFiles}
    <div class="files">
      {#each $UserData.sh.desktop.pinnedFiles as file}
        <File path={file} />
        <File path={file} />
        <File path={file} />
        <File path={file} />
      {/each}
    </div>
  {/if}
</div>
