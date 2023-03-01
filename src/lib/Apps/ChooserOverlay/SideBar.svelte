<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getDirectory } from "../../../ts/api/fs/directory";
  import type {
    PartialUserDir,
    UserDirectory,
  } from "../../../ts/api/interface";
  import Link from "./SideBar/Link.svelte";

  let folders: PartialUserDir[] = [];
  export let currentDir: Writable<UserDirectory>;
  export let currentPath: Writable<string>;
  export let setDir: (path: string) => void;

  currentDir.subscribe(async (v) => {
    folders = ((await getDirectory("./")) as UserDirectory).directories;
  });
</script>

<div class="sidebar">
  {#each folders as folder}
    <Link {setDir} {currentPath} {folder} />
  {/each}
</div>
