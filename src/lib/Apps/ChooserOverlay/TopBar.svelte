<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getParentDirectory } from "../../../ts/api/fs/main";
  import {
    getAppPreference,
    setAppPreference,
  } from "../../../ts/applogic/pref";
  import { UserData } from "../../../ts/userlogic/interfaces";
  import Crumb from "./Crumb.svelte";
  export let currentPath: Writable<string>;
  export let refresh: () => void;
  export let setDir: (path: string) => void;

  let crumbs: string[];
  export let tiled: boolean;

  currentPath.subscribe((v) => {
    crumbs = v.split("/");

    refresh();

    tiled = !!getAppPreference("FileManager", "tiled");
  });

  function home() {
    currentPath.set("./");
  }

  function generatePath(crumb: string, I: number) {
    let str = "";

    for (let i = 0; i < I; i++) {
      str += `${crumbs[i]}/`;
    }

    return `${str}${crumb}`;
  }

  function parentdir() {
    setDir(getParentDirectory($currentPath));
  }

  function toggle() {
    tiled = !tiled;

    setAppPreference("FileManager", "tiled", tiled);
  }

  UserData.subscribe(() => {
    tiled = !!getAppPreference("FileManager", "tiled");
  });
</script>

<div class="topbar">
  <button
    class="parentdir material-icons-round"
    on:click={parentdir}
    disabled={crumbs.length == 2 && crumbs[0] == "." && !crumbs[1]}
    >arrow_upward</button
  >
  <button class="home material-icons-round" on:click={home}>home</button>
  <div class="addressbar">
    {#each crumbs as crumb, i}
      <Crumb {crumb} path={generatePath(crumb, i)} {setDir} />
    {/each}
  </div>
  <button class="refresh material-icons-round" on:click={refresh}>
    refresh
  </button>
  <div class="group">
    <button
      class="material-icons-round"
      class:selected={tiled}
      disabled={!tiled}
      on:click={toggle}
      title="List view"
    >
      format_list_bulleted
    </button>
    <button
      class="material-icons-round"
      class:selected={!tiled}
      disabled={tiled}
      on:click={toggle}
      title="Tile view"
    >
      grid_view
    </button>
  </div>
</div>
