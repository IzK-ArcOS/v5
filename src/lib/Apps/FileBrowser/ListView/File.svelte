<script lang="ts">
  import { onMount } from "svelte";
  import icon from "../../../../assets/apps/filemanager/file.svg";
  import { getMimeIcon } from "../../../../ts/api/fs/icon";
  import { openUserFile, openWithDialog } from "../../../../ts/api/fs/open";
  import { formatBytes } from "../../../../ts/api/fs/sizes";
  import type { UserFile } from "../../../../ts/api/interface";
  import {
    FileBrowserCuttingFilename as cutting,
    FileBrowserDirContents,
    FileBrowserOpeningFile,
    FileBrowserSelectedFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import type { ArcFile } from "../../../../ts/applogic/interface";
  import { createOverlayableError } from "../../../../ts/errorlogic/overlay";
  import { hideOverlay, showOverlay } from "../../../../ts/window/overlay";

  export let file: UserFile;

  let img = icon;

  function select() {
    $FileBrowserSelectedFilename = file.filename;
  }

  async function open() {
    $FileBrowserOpeningFile = file;
    showOverlay("openingFile", "FileManager");

    let openResult = await openUserFile(file);

    hideOverlay("openingFile", "FileManager");

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
        "FileManager"
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
  class="item file"
  on:click={select}
  on:dblclick={open}
  class:selected={$FileBrowserSelectedFilename == file.filename}
  title={file.scopedPath}
  class:cutting={$cutting && $cutting.name == file.filename}
>
  <div class="image"><img src={img} alt={file.filename} /></div>
  <div class="name">{file.filename}</div>
  <div class="mime">{file.mime.split("; ")[0].split("/").join(" - ")}</div>
  <div class="size">{formatBytes(file.size)}</div>
</button>
