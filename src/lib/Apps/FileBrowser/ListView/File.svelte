<script lang="ts">
  import type { UserFile } from "../../../../ts/api/interface";
  import { FileBrowserSelectedFilename } from "../../../../ts/applogic/apps/FileBrowser/main";
  import icon from "../../../../assets/apps/filemanager/file.svg";
  import {
    findAppToOpen,
    openWith,
    openWithDialog,
  } from "../../../../ts/api/fs/open";
  import { readFile } from "../../../../ts/api/fs/file";
  import { createOverlayableError } from "../../../../ts/errorlogic/overlay";

  export let file: UserFile;

  function select() {
    $FileBrowserSelectedFilename = file.filename;
  }

  async function open() {
    const apps = findAppToOpen(file.mime);

    if (!apps.length)
      return createOverlayableError(
        {
          title: `Unable to open ${file.filename}`,
          message: "You don't have an app that can open this type of file.",
          buttons: [{ caption: "Close", action: () => {} }],
          image: icon,
        },
        "FileManager"
      );

    openWithDialog({
      data: await readFile(file.scopedPath),
      name: file.filename,
      path: file.scopedPath,
      mime: file.mime,
    });
  }
</script>

<button
  class="item file"
  on:click={select}
  on:dblclick={open}
  class:selected={$FileBrowserSelectedFilename == file.filename}
>
  <div class="image"><img src={icon} alt={file.filename} /></div>
  <div class="name">{file.filename}</div>
  <div class="size">{file.size} bytes</div>
</button>
