<script lang="ts">
  import { onMount } from "svelte";
  import { getPartialFile } from "../../../../../ts/api/fs/file";
  import { getParentDirectory } from "../../../../../ts/api/fs/main";
  import { unpinFile } from "../../../../../ts/api/fs/pins/file";
  import { fbClass } from "../../../../../ts/applogic/apps/FileBrowser/main";
  import { createOverlayableError } from "../../../../../ts/errorlogic/overlay";
  import { ErrorIcon } from "../../../../../ts/icon/apps";
  import { FileIcon } from "../../../../../ts/icon/general";

  export let path: string;

  let name = "Unknown";
  let parent = "";

  onMount(() => {
    const split = path.split("/").filter((p) => !!p);

    parent = split.length > 1 ? split[split.length - 2] : "ArcFS";
    name = path
      .replace(getParentDirectory(path), "")
      .replaceAll("/", "")
      .trim();
  });

  async function openFile() {
    const partial = await getPartialFile(path);

    if (!partial) {
      notFound();
      return;
    }

    fbClass.openFile(partial);
  }

  function notFound() {
    createOverlayableError(
      {
        title: "File not found",
        message: `ArcOS was unable to open <code>${path}</code>: the file could not be found. Please check the path and try again.`,
        image: ErrorIcon,
        buttons: [
          {
            caption: "Unpin file",
            action() {
              unpinFile(path);
            },
          },
          { caption: "Okay", action() {}, suggested: true },
        ],
      },
      "FileManager"
    );
  }
</script>

<button on:click={openFile} data-contextmenu="homepage-file" data-path={path}>
  <div class="image"><img src={FileIcon} alt={path} /></div>
  <div class="name">{name}</div>
  <div class="parent">In {parent}</div>
</button>
