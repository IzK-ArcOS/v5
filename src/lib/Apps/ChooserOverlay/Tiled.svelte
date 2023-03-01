<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { UserDirectory } from "../../../ts/api/interface";
  import type { OverlayableApp } from "../../../ts/applogic/interface";
  import Dir from "./Tiled/Dir.svelte";
  import File from "./Tiled/File.svelte";

  export let overlay: OverlayableApp;
  export let selected: Writable<string>;
  export let processing: Writable<boolean>;
  export let data: UserDirectory;
  export let setDir: (path: string) => void;
</script>

<div class="tiled">
  {#if data.directories.length}
    <div class="dirs">
      {#each data.directories as dir}
        <Dir {dir} {setDir} />
      {/each}
    </div>
  {/if}
  <div class="files">
    {#each data.files as file}
      <File {file} {overlay} {selected} {processing} />
    {/each}
  </div>
</div>
