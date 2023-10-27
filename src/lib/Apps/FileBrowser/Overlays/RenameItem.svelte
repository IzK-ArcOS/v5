<script lang="ts">
  import "../../../../css/desktop/apps/filebrowser/overlays/mutator.css";
  import { getMimeIcon } from "../../../../ts/api/fs/icon/main";
  import { renameItem } from "../../../../ts/api/fs/rename";
  import {
    fbClass,
    fbState,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { FolderIcon } from "../../../../ts/icon/general";
  import { hideOverlay } from "../../../../ts/window/overlay";

  let newName = "";
  let img = "";

  let isDir = false;
  let exists = false;

  function updateExists() {
    const directories = $fbState.dirContents.directories;
    const files = $fbState.dirContents.files;

    isDir = checkIsDir();

    for (let i = 0; i < directories.length; i++) {
      if (directories[i].name == $fbState.currentDir) isDir = true;
    }

    for (let j = 0; j < files.length; j++) {
      if (files[j].filename == newName) return (exists = true);
    }

    exists = false;
  }

  fbState.subscribe((v) => {
    if (!v || !v.selectedFilename) return;

    isDir = checkIsDir();
    img = getMimeIcon(v.selectedFilename);
  });

  function checkIsDir() {
    const directories = $fbState.dirContents.directories;

    for (let i = 0; i < directories.length; i++) {
      if (directories[i].name == $fbState.selectedFilename) return true;
    }

    return false;
  }

  async function rename() {
    await renameItem(
      `${$fbState.currentDir}/${$fbState.selectedFilename}`,
      `${$fbState.currentDir}/${newName}`
    );

    $fbState.selectedFilename = newName;

    cancel();

    newName = "";

    fbClass.refresh();
  }

  function cancel() {
    hideOverlay("renameItem", "FileManager");
  }
</script>

<div class="fb-overlay-mutator-wrapper">
  <div class="image"><img src={isDir ? FolderIcon : img} alt="" /></div>
  <div>
    <p>Enter a new name for {$fbState.selectedFilename}:</p>
    <input
      type="text"
      bind:value={newName}
      on:input={updateExists}
      placeholder={$fbState.selectedFilename}
    />
    <div class="actions">
      <div class="inner">
        <button disabled={exists || !newName} on:click={rename}>Rename</button>
        <button on:click={cancel}>Cancel</button>
      </div>
    </div>
  </div>
</div>
