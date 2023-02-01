<script lang="ts">
  import icon from "../../../../assets/apps/filemanager/folder.svg";
  import { createDirectory } from "../../../../ts/api/fs/directory";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserDirContents,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { hideOverlay } from "../../../../ts/window/overlay";
  import "../../../../css/desktop/apps/filebrowser/overlays/mutator.css";

  let folderName = "";

  let exists = false;

  function updateExists() {
    const directories = $FileBrowserDirContents.directories;
    const files = $FileBrowserDirContents.files;

    for (let i = 0; i < directories.length; i++) {
      if (directories[i].name == folderName) return (exists = true);
    }

    for (let j = 0; j < files.length; j++) {
      if (files[j].filename == folderName) return (exists = true);
    }

    exists = false;
  }

  async function create() {
    await createDirectory(`${$FileBrowserCurrentDir}/${folderName}`);

    hideOverlay("createFolder", "FileManager");
    fbClass.refresh(false);
  }
</script>

<div class="fb-overlay-mutator-wrapper">
  <div class="image"><img src={icon} alt="" /></div>
  <div>
    <p>Enter a name for the new folder:</p>
    <input type="text" bind:value={folderName} on:input={updateExists} />
    <div class="actions">
      <div class="inner">
        <button disabled={exists} on:click={create}>Apply</button>
        <button>Cancel</button>
      </div>
    </div>
  </div>
</div>
