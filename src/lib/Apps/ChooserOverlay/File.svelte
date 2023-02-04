<script lang="ts">
  import type { UserFile } from "../../../ts/api/interface";
  import icon from "../../../assets/apps/filemanager/file.svg";
  import { onMount } from "svelte";
  import { getMimeIcon } from "../../../ts/api/fs/icon";
  import { formatBytes } from "../../../ts/api/fs/sizes";
  import { getChooserTarget, setTargetFile } from "../../../ts/chooser/store";
  import type { OverlayableApp } from "../../../ts/applogic/interface";
  import { readFile } from "../../../ts/api/fs/file";
  import type { Writable } from "svelte/store";

  export let overlay: OverlayableApp;
  export let selected: Writable<string>;
  export let processing: Writable<boolean>;

  let img = "";

  onMount(() => {
    img = getMimeIcon(file.filename);
  });

  async function process() {
    $processing = true;

    const data = {
      name: file.filename,
      path: file.scopedPath,
      data: (await readFile(file.scopedPath)) as ArrayBuffer,
      mime: file.mime,
    };

    console.log(data);

    setTargetFile(overlay.id, data);

    $processing = false;
  }

  export let file: UserFile;
</script>

<button
  class="item file"
  on:dblclick={process}
  class:selected={$selected == file.filename}
  on:click={() => ($selected = file.filename)}
>
  <div class="image"><img src={img} alt={file.filename} /></div>
  <div class="name">{file.filename}</div>
  <div class="mime">{file.mime.split("; ")[0].split("/").join(" - ")}</div>
  <div class="size">{formatBytes(file.size)}</div>
</button>
