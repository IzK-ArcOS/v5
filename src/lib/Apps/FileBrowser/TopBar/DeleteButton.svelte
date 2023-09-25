<script lang="ts">
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserDeletingFilename,
    FileBrowserSelectedFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { createOverlayableError } from "../../../../ts/errorlogic/overlay";
  import { hideOverlay, showOverlay } from "../../../../ts/window/overlay";
  import { deleteItem } from "../../../../ts/api/fs/delete";
  import { ErrorIcon } from "../../../../ts/icon/apps";
  import { TrashIcon } from "../../../../ts/icon/main";

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
        image: TrashIcon,
      },
      "FileManager"
    );
  }

  async function confirmDelete() {
    const path = `${$FileBrowserCurrentDir}/${$FileBrowserSelectedFilename}`;

    FileBrowserDeletingFilename.set($FileBrowserSelectedFilename);

    showOverlay("deletingItem", "FileManager");

    const valid = await deleteItem(path);

    if (!valid)
      createOverlayableError(
        {
          title: "Unable to delete item",
          message:
            "ArcAPI was not able to delete the item from the file system. A permission error may have occured. Please try again later.",
          buttons: [{ caption: "OK", action() {} }],
          image: ErrorIcon,
        },
        "FileManager"
      );

    FileBrowserSelectedFilename.set(null);

    fbClass.refresh();

    setTimeout(() => {
      hideOverlay("deletingItem", "FileManager");
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
