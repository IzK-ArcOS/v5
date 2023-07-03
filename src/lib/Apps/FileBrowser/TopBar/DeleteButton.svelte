<script lang="ts">
  import { deleteItem } from "../../../../ts/api/fs/file";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserDeletingFilename,
    FileBrowserSelectedFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { createOverlayableError } from "../../../../ts/errorlogic/overlay";
  import trash from "../../../../assets/apps/logger/clear.svg";
  import warning from "../../../../assets/apps/error.svg";
  import { hideOverlay, showOverlay } from "../../../../ts/window/overlay";
  import type { Process } from "../../../../ts/applogic/interface";

  export let process: Process;

  function deleteSelected() {
    createOverlayableError(
      {
        title: "Delete item?",
        message: `Are you sure you want to permanently delete ${$FileBrowserSelectedFilename}?`,
        buttons: [
          {
            caption: "Delete",
            action: confirmDelete,
          },
          { caption: "Cancel", action() {} },
        ],
        image: trash,
      },
      process.id
    );
  }

  async function confirmDelete() {
    const path = `${$FileBrowserCurrentDir}/${$FileBrowserSelectedFilename}`;

    FileBrowserDeletingFilename.set($FileBrowserSelectedFilename);

    showOverlay("deletingItem", process.id);

    const valid = await deleteItem(path);

    if (!valid)
      createOverlayableError(
        {
          title: "Unable to delete item",
          message:
            "ArcAPI was not able to delete the item from the file system. A permission error may have occured. Please try again later.",
          buttons: [{ caption: "OK", action() {} }],
          image: warning,
        },
        process.id
      );

    FileBrowserSelectedFilename.set(null);

    fbClass.refresh();

    setTimeout(() => {
      hideOverlay("deletingItem", process.id);
    }, 100);
  }
</script>

<button
  class="material-icons-round"
  disabled={!$FileBrowserSelectedFilename}
  on:click={deleteSelected}
  title="Delete item"
>
  delete
</button>
