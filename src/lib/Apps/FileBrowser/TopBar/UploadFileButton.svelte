<script lang="ts">
  import mime from "mime-types";
  import upload from "../../../../assets/apps/filemanager/upload.svg";
  import { writeFile } from "../../../../ts/api/fs/file";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserUploadFile,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import type { ArcFile } from "../../../../ts/applogic/interface";
  import { makeNotification } from "../../../../ts/notiflogic/main";
  import { hideOverlay, showOverlay } from "../../../../ts/window/overlay";

  let uploader: HTMLInputElement;

  async function doUpload() {
    const file = uploader.files[0];

    if (!file) return;

    const content = new Blob([new Uint8Array(await file.arrayBuffer())]);
    const path = `${$FileBrowserCurrentDir}/${file.name}`;

    const data: ArcFile = {
      name: file.name,
      path,
      data: await file.arrayBuffer(),
      mime: (mime.contentType(file.name) as string) || "unknown",
    };

    showOverlay("uploadingFile", "FileManager");

    FileBrowserUploadFile.set(data);

    const valid = await writeFile(
      `${$FileBrowserCurrentDir}/${file.name}`,
      content
    );

    hideOverlay("uploadingFile", "FileManager");

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
</script>

<input type="file" name="file" bind:this={uploader} on:change={doUpload} />

<button class="material-icons-round" on:click={() => uploader.click()}
  >upload</button
>

<style scoped>
  input[type="file"] {
    display: none;
  }
</style>
