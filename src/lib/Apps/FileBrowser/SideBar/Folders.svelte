<script lang="ts">
  import {
    getDirectory,
    sortDirectories,
  } from "../../../../ts/api/fs/directory";
  import type {
    PartialUserDir,
    UserDirectory,
  } from "../../../../ts/api/interface";
  import { fbState } from "../../../../ts/applogic/apps/FileBrowser/main";
  import Spinner from "../../../Spinner.svelte";
  import Folder from "./Folder.svelte";

  let folders: PartialUserDir[] = [];
  let loading = false;

  let currentJoin = "";

  fbState.subscribe(async () => {
    if (!currentJoin) loading = true;

    const unsorted = ((await getDirectory("./")) as UserDirectory).directories;
    const join = unsorted.map((v) => v.name.toLowerCase()).join("|");

    if (currentJoin == join) return;

    currentJoin = join;

    loading = true;

    folders = sortDirectories(unsorted);

    loading = false;
  });
</script>

<div class="dirs">
  {#if !loading}
    {#each folders as folder}
      <Folder {folder} />
    {/each}
  {:else}
    <div class="loading">
      <Spinner height={24} />
    </div>
  {/if}
</div>
