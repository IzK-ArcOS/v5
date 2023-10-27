<script lang="ts">
  import { onMount } from "svelte";
  import { getMimeIcon } from "../../../../ts/api/fs/icon/main";
  import { formatBytes } from "../../../../ts/api/fs/sizes";
  import type { PartialArcFile } from "../../../../ts/api/interface";
  import {
    fbClass,
    fbState,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { FileIcon } from "../../../../ts/icon/general";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(relativeTime);

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
  class="item file"
  on:click={select}
  on:contextmenu={select}
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
  <div class="image"><img src={img} alt={file.filename} /></div>
  <div class="name">{file.filename}</div>
  <div class="mime">{file.mime.split("; ")[0].split("/").join(" - ")}</div>
  <div class="modified">{dayjs(file.dateModified || null).fromNow()}</div>
  <div class="size">{formatBytes(file.size)}</div>
  <div class="options">
    <button
      class="material-icons-round"
      on:click={() => fbClass.openWith(file)}
    >
      launch
    </button>
  </div>
</button>
