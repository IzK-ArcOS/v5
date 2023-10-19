<script lang="ts">
  import "../../../../css/desktop/apps/filebrowser/overlays/mutator.css";
  import { writeFile } from "../../../../ts/api/fs/file";
  import { getMimeIcon } from "../../../../ts/api/fs/icon/main";
  import {
    fbClass,
    fbState,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { PlainMimeIcon } from "../../../../ts/icon/mimetypes";
  import { hideOverlay } from "../../../../ts/window/overlay";

  let filename = "";
  let img = "";

  let exists = false;

  function updateExists() {
    const directories = $fbState.dirContents.directories;
    const files = $fbState.dirContents.files;

    for (let i = 0; i < directories.length; i++) {
      if (directories[i].name == filename) return (exists = true);
    }

    for (let j = 0; j < files.length; j++) {
      if (files[j].filename == filename) return (exists = true);
    }

    exists = false;
    img = getMimeIcon(filename) || PlainMimeIcon;
  }

  async function create() {
    await writeFile(`${$fbState.currentDir}/${filename}`, new Blob([]));

    $fbState.selectedFilename = filename;

    cancel();

    fbClass.refresh();
  }

  function cancel() {
    hideOverlay("createFile", "FileManager");
    filename = "";
  }
</script>

<div class="fb-overlay-mutator-wrapper">
  <div class="image"><img src={img || PlainMimeIcon} alt="" /></div>
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
