<script lang="ts">
  import { onMount } from "svelte";
  import icon from "../../../../assets/apps/filemanager/file.svg";
  import { getMimeIcon } from "../../../../ts/api/fs/icon";
  import { openUserFile, openWithDialog } from "../../../../ts/api/fs/open";
  import type { ArcFile, PartialArcFile } from "../../../../ts/api/interface";
  import {
    FileBrowserDirContents,
    FileBrowserOpeningFile,
    FileBrowserSelectedFilename,
    FileBrowserCuttingFilename as cutting,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import type { Process } from "../../../../ts/applogic/interface";
  import { createOverlayableError } from "../../../../ts/errorlogic/overlay";
  import { hideOverlay, showOverlay } from "../../../../ts/window/overlay";

  export let file: PartialArcFile;
  export let process: Process;
  let img = icon;

  function select() {
    $FileBrowserSelectedFilename = file.filename;
  }

  async function open() {
    $FileBrowserOpeningFile = file;

    showOverlay("openingFile", process.id);

    let openResult = await openUserFile(file);

    hideOverlay("openingFile", process.id);

    $FileBrowserOpeningFile = null;

    if (openResult != true) {
      const x = openResult;
      createOverlayableError(
        {
          title: `Unable to open ${file.filename}`,
          message:
            "You don't have an app or handler that can open this type of file.",
          buttons: [
            {
              caption: "Close",
              action: () => {
                openResult = null;
              },
            },
            {
              caption: "Open With...",
              action: () => openAny(x),
            },
          ],
          image: icon,
        },
        process.id
      );
    }

    openResult = null;
  }

  function openAny(arc: ArcFile) {
    openWithDialog({ ...arc, anymime: true });
  }

  onMount(() => {
    img = getMimeIcon(file.filename);
  });

  FileBrowserDirContents.subscribe(() => (img = getMimeIcon(file.filename)));
</script>

<button
  class="tile file"
  on:click={select}
  on:dblclick={open}
  class:selected={$FileBrowserSelectedFilename == file.filename}
  class:cutting={$cutting && $cutting.name == file.filename}
  title={file.scopedPath}
>
  <img src={img} alt={file.filename} />
  <p class="name">{file.filename}</p>
</button>
