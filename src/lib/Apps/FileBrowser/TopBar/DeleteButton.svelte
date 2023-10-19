<script lang="ts">
  import { deleteItem } from "../../../../ts/api/fs/delete";
  import {
    fbClass,
    fbState,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { createOverlayableError } from "../../../../ts/errorlogic/overlay";
  import { ErrorIcon } from "../../../../ts/icon/apps";
  import { TrashIcon } from "../../../../ts/icon/general";
  import { hideOverlay, showOverlay } from "../../../../ts/window/overlay";

  function deleteSelected() {
    createOverlayableError(
      {
        title: "Delete item?",
        message: `Are you sure you want to permanently delete ${$fbState.selectedFilename}?`,
        buttons: [
          {
            caption: "Delete",
            action: confirmDelete,
            suggested: true,
          },
          { caption: "Cancel", action() {} },
        ],
        image: TrashIcon,
      },
      "FileManager"
    );
  }

  async function confirmDelete() {
    const path = `${$fbState.currentDir}/${$fbState.selectedFilename}`;

    $fbState.deletingFilename = $fbState.selectedFilename;

    showOverlay("deletingItem", "FileManager");

    const valid = await deleteItem(path);

    if (!valid)
      createOverlayableError(
        {
          title: "Unable to delete item",
          message:
            "ArcAPI was not able to delete the item from the file system. A permission error may have occured. Please try again later.",
          buttons: [{ caption: "OK", action() {}, suggested: true }],
          image: ErrorIcon,
        },
        "FileManager"
      );

    $fbState.selectedFilename = null;

    fbClass.refresh();

    setTimeout(() => {
      hideOverlay("deletingItem", "FileManager");
    }, 100);
  }
</script>

<button
  class="material-icons-round"
  disabled={!$fbState.selectedFilename || $fbState.home}
  on:click={deleteSelected}
  title="Delete item"
>
  delete
</button>
