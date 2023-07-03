<script lang="ts">
  import defaultIcon from "../../../../assets/mimetypes/text-plain.svg";
  import "../../../../css/desktop/apps/filebrowser/overlays/mutator.css";
  import { writeFile } from "../../../../ts/api/fs/file";
  import { getMimeIcon } from "../../../../ts/api/fs/icon";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserDirContents,
    FileBrowserSelectedFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import type { Process } from "../../../../ts/applogic/interface";
  import { hideOverlay } from "../../../../ts/window/overlay";

  export let parent: Process;

  let filename = "";
  let img = "";

  let exists = false;

  function updateExists() {
    const directories = $FileBrowserDirContents.directories;
    const files = $FileBrowserDirContents.files;

    for (let i = 0; i < directories.length; i++) {
      if (directories[i].name == filename) return (exists = true);
    }

    for (let j = 0; j < files.length; j++) {
      if (files[j].filename == filename) return (exists = true);
    }

    exists = false;
    img = getMimeIcon(filename) || defaultIcon;
  }

  async function create() {
    await writeFile(`${$FileBrowserCurrentDir}/${filename}`, new Blob([]));

    FileBrowserSelectedFilename.set(filename);

    cancel();

    fbClass.refresh();
  }

  function cancel() {
    hideOverlay("createFile", parent.id);
    filename = "";
  }
</script>

<div class="fb-overlay-mutator-wrapper">
  <div class="image"><img src={img || defaultIcon} alt="" /></div>
  <div>
    <p>Enter a name for the new file:</p>
    <input type="text" bind:value={filename} on:input={updateExists} />
    <div class="actions">
      <div class="inner">
        <button disabled={exists} on:click={create}>Create</button>
        <button on:click={cancel}>Cancel</button>
      </div>
    </div>
  </div>
</div>
