<script lang="ts">
  import { onMount } from "svelte";
  import type { PartialArcFile } from "../../../../ts/api/interface";
  import { FileIcon } from "../../../../ts/icon/general";
  import { getParentDirectory } from "../../../../ts/api/fs/main";

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
</script>

<button>
  <div class="image"><img src={FileIcon} alt={path} /></div>
  <div class="name">{name}</div>
  <div class="parent">In {parent}</div>
</button>
