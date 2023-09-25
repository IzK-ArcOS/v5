<script lang="ts">
  import { fileToArcFile } from "../../../../ts/api/fs/convert";
  import { writeFile } from "../../../../ts/api/fs/file";
  import { arrayToBlob } from "../../../../ts/api/fs/file/conversion";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserUploadFile,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { createOverlayableError } from "../../../../ts/errorlogic/overlay";
  import { UploadIcon } from "../../../../ts/icon/main";
  import { makeNotification } from "../../../../ts/notiflogic/main";
  import { hideOverlay, showOverlay } from "../../../../ts/window/overlay";

  let uploader: HTMLInputElement;

  async function doUpload() {
    const files = uploader.files;

    if (files.length > 80) {
      return createOverlayableError(
        {
          title: "Too many files",
          message:
            "You are only allowed to upload 80 files at a time to prevent overloading.",
          buttons: [{ caption: "Understood", action() {} }],
          image: UploadIcon,
        },
        "FileManager"
      );
    }

    showOverlay("uploadingFile", "FileManager");

    let maxTimeout = 50;

    for (let i = 0; i < files.length; i++) {
      maxTimeout += 25;

      if (!files[i]) continue;

      await fileUpload(files[i]);
    }

    setTimeout(() => {
      hideOverlay("uploadingFile", "FileManager");

      fbClass.refresh();
    }, maxTimeout + 500);
  }

  async function fileUpload(file: File) {
    const content = arrayToBlob(await file.arrayBuffer());
    const path = `${$FileBrowserCurrentDir}/${file.name}`.split("//").join("/");

    const data = await fileToArcFile(file, path);

    FileBrowserUploadFile.set(data);

    const valid = await writeFile(path, content);

    if (!valid)
      makeNotification({
        title: "File upload failed",
        message:
          "The server could not parse the file or it could not be written to the ArcFS",
        buttons: [],
        image: UploadIcon,
      });
  }
</script>

<input
  type="file"
  name="file"
  bind:this={uploader}
  on:change={doUpload}
  multiple
/>

<button
  class="material-icons-round"
  on:click={() => uploader.click()}
  title="Upload file"
>
  upload
</button>

<style scoped>
  input[type="file"] {
    display: none;
  }
</style>
