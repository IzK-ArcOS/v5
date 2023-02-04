<script>
  import { deleteItem } from "../../../../ts/api/fs/file";
  import {
    fbClass,
    FileBrowserCurrentDir,
    FileBrowserDeletingFilename,
    FileBrowserSelectedFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { errorMessage } from "../../../../ts/errorlogic/main";
  import { createOverlayableError } from "../../../../ts/errorlogic/overlay";
  import trash from "../../../../assets/apps/logger/clear.svg";
  import { hideOverlay, showOverlay } from "../../../../ts/window/overlay";

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
      "FileManager"
    );
  }

  async function confirmDelete() {
    const path = `${$FileBrowserCurrentDir}/${$FileBrowserSelectedFilename}`;

    FileBrowserDeletingFilename.set($FileBrowserSelectedFilename);

    showOverlay("deletingItem", "FileManager");

    await deleteItem(path);

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
