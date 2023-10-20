<script lang="ts">
  import { onMount } from "svelte";
  import { getMimeIcon } from "../../../../ts/api/fs/icon/main";
  import type { PartialArcFile } from "../../../../ts/api/interface";
  import {
    fbClass,
    fbState,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { FileIcon } from "../../../../ts/icon/general";

  export let file: PartialArcFile;

  let img = FileIcon;

  function select() {
    $fbState.selectedFilename = file.filename;
  }

  onMount(() => {
    img = getMimeIcon(file.filename);
  });

  fbState.subscribe(() => {
    img = getMimeIcon(file.filename);
  });
</script>

<button
  class="tile file"
  on:click={select}
  on:dblclick={() => fbClass.openFile(file)}
  class:selected={$fbState.selectedFilename == file.filename}
  title={file.scopedPath}
  class:cutting={$fbState.cuttingFilename &&
    $fbState.cuttingFilename.name == file.filename}
  data-path={file.scopedPath}
  data-type="file"
  data-name={file.filename}
  data-contextmenu="listitem-file"
>
  <img src={img} alt={file.filename} />
  <p class="name">{file.filename}</p>
</button>
