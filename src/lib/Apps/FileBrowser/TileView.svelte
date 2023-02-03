<script lang="ts">
  import "@css/desktop/apps/filebrowser/tile.css";
  import type { PartialUserDir, UserFile } from "$$ts/api/interface";
  import Dir from "./TileView/Dir.svelte";
  import File from "./TileView/File.svelte";

  export let files: UserFile[] = [];
  export let dirs: PartialUserDir[] = [];

  files;
  dirs;
</script>

<div class="tileview">
  {#if dirs.length}
    <div class="folders">
      {#each dirs as dir}
        <Dir {dir} />
      {/each}
    </div>
  {/if}
  {#if files.length}
    <div class="files">
      {#each files as file}
        <File {file} />
      {/each}
    </div>
  {/if}
</div>
