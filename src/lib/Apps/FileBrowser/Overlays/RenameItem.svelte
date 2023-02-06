<script lang="ts">
  import icon from "../../../../assets/apps/filemanager/folder.svg";
  import { createDirectory } from "../../../../ts/api/fs/directory";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserDirContents,
    FileBrowserSelectedFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { hideOverlay } from "../../../../ts/window/overlay";
  import "../../../../css/desktop/apps/filebrowser/overlays/mutator.css";
  import { renameItem } from "../../../../ts/api/fs/rename";
  import { getMimeIcon } from "../../../../ts/api/fs/icon";

  let newName = "";
  let img = "";

  let isDir = false;
  let exists = false;

  function updateExists() {
    const directories = $FileBrowserDirContents.directories;
    const files = $FileBrowserDirContents.files;

    isDir = checkIsDir();

    for (let i = 0; i < directories.length; i++) {
      if (directories[i].name == $FileBrowserCurrentDir) isDir = true;
    }

    for (let j = 0; j < files.length; j++) {
      if (files[j].filename == newName) return (exists = true);
    }

    exists = false;
  }

  FileBrowserSelectedFilename.subscribe((v) => {
    if (!v) return;

    isDir = checkIsDir();
    img = getMimeIcon(v);
  });

  function checkIsDir() {
    const directories = $FileBrowserDirContents.directories;

    for (let i = 0; i < directories.length; i++) {
      if (directories[i].name == $FileBrowserSelectedFilename) return true;
    }

    return false;
  }

  async function rename() {
    await renameItem(
      `${$FileBrowserCurrentDir}/${$FileBrowserSelectedFilename}`,
      `${$FileBrowserCurrentDir}/${newName}`
    );

    FileBrowserSelectedFilename.set(newName);

    cancel();

    newName = "";

    fbClass.refresh();
  }

  function cancel() {
    hideOverlay("renameItem", "FileManager");
  }
</script>

<div class="fb-overlay-mutator-wrapper">
  <div class="image"><img src={isDir ? icon : img} alt="" /></div>
  <div>
    <p>Enter a new name for {$FileBrowserSelectedFilename}:</p>
    <input
      type="text"
      bind:value={newName}
      on:input={updateExists}
      placeholder={$FileBrowserSelectedFilename}
    />
    <div class="actions">
      <div class="inner">
        <button disabled={exists || !newName} on:click={rename}>Rename</button>
        <button on:click={cancel}>Cancel</button>
      </div>
    </div>
  </div>
</div>
