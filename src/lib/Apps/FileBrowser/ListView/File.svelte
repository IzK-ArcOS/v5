<script lang="ts">
  import type { UserFile } from "../../../../ts/api/interface";
  import { FileBrowserSelectedFilename } from "../../../../ts/applogic/apps/FileBrowser/main";
  import icon from "../../../../assets/apps/filemanager/file.svg";
  import { findAppToOpen, openWith } from "../../../../ts/api/fs/open";
  import { readFile } from "../../../../ts/api/fs/file";

  export let file: UserFile;

  function select() {
    $FileBrowserSelectedFilename = file.filename;
  }

  async function open() {
    const app = findAppToOpen(file.mime)[0];

    openWith(app, {
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
