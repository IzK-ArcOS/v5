<script lang="ts">
  import "../../../../css/desktop/apps/filebrowser/overlays/mutator.css";
  import { createDirectory } from "../../../../ts/api/fs/directory";
  import {
    fbClass,
    fbState,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { FolderIcon } from "../../../../ts/icon/general";
  import { hideOverlay } from "../../../../ts/window/overlay";

  let folderName = "";

  let exists = false;

  function updateExists() {
    const directories = $fbState.dirContents.directories;
    const files = $fbState.dirContents.files;

    for (let i = 0; i < directories.length; i++) {
      if (directories[i].name == folderName) return (exists = true);
    }

    for (let j = 0; j < files.length; j++) {
      if (files[j].filename == folderName) return (exists = true);
    }

    exists = false;
  }

  async function create() {
    await createDirectory(`${$fbState.currentDir}/${folderName}`);

    $fbState.selectedFilename = folderName;

    cancel();

    fbClass.refresh();
  }

  function cancel() {
    hideOverlay("createFolder", "FileManager");
    folderName = "";
  }
</script>

<div class="fb-overlay-mutator-wrapper">
  <div class="image"><img src={FolderIcon} alt="" /></div>
  <div>
    <p>Enter a name for the new folder:</p>
    <input type="text" bind:value={folderName} on:input={updateExists} />
    <div class="actions">
      <div class="inner">
        <button disabled={exists} on:click={create}>Create</button>
        <button on:click={cancel}>Cancel</button>
      </div>
    </div>
  </div>
</div>
