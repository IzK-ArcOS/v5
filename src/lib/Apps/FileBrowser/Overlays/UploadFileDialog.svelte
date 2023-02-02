<script lang="ts">
  import { onMount } from "svelte";
  import upload from "../../../../assets/apps/filemanager/upload.svg";
  import { writeFile } from "../../../../ts/api/fs/file";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserUploadFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { makeNotification } from "../../../../ts/notiflogic/main";
  import { hideOverlay, showOverlay } from "../../../../ts/window/overlay";

  let uploader: HTMLInputElement;

  async function onchange() {
    const file = uploader.files[0];

    console.log(file);
    console.log(uploader);

    const content = new Blob([new Uint8Array(await file.arrayBuffer())]);

    showOverlay("uploadingFile", "FileManager");

    FileBrowserUploadFilename.set(file.name);

    const valid = await writeFile(
      `${$FileBrowserCurrentDir}/${file.name}`,
      content
    );

    hideOverlay("uploadingFile", "FileManager");
    hideOverlay("uploadFileDialog", "FileManager");

    if (!valid)
      makeNotification({
        title: "File upload failed",
        message:
          "The server could not parse the file or it could not be written to the ArcFS",
        buttons: [],
        image: upload,
      });

    fbClass.refresh(false);
  }

  onMount(async () => {});
</script>

<div class="fb-overlay-mutator-wrapper">
  <div class="image">
    <img src={upload} alt="" />
  </div>
  <div>
    <p>Upload a file</p>
    <input type="file" bind:this={uploader} />
    <div class="actions">
      <div class="inner">
        <button> Cancel </button>
        <button on:click={onchange}> Upload </button>
      </div>
    </div>
  </div>
</div>
