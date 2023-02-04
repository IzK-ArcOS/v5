<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getParentDirectory } from "../../../ts/api/fs/main";
  import type { UserDirectory } from "../../../ts/api/interface";
  import Crumb from "./Crumb.svelte";
  export let currentPath: Writable<string>;
  export let refresh: () => void;
  export let setDir: (path: string) => void;

  let crumbs: string[];

  currentPath.subscribe((v) => {
    crumbs = v.split("/");

    refresh();
  });

  function home() {
    currentPath.set("./");
  }

  function generatePath(crumb: string, I: number) {
    let str = "";

    for (let i = 0; i < I; i++) {
      str += `${crumbs[i]}/`;
    }

    console.log(crumbs);

    return `${str}${crumb}`;
  }

  function parentdir() {
    setDir(getParentDirectory($currentPath));
  }
</script>

<div class="topbar">
  <button
    class="parentdir material-icons-round"
    on:click={parentdir}
    disabled={crumbs.length == 2 && crumbs[0] == "." && !crumbs[1]}
    >arrow_upward</button
  >
  <button class="refresh material-icons-round" on:click={refresh}>
    refresh
  </button>
  <button class="home material-icons-round" on:click={home}>home</button>
  <div class="addressbar">
    {#each crumbs as crumb, i}
      <Crumb {crumb} path={generatePath(crumb, i)} {setDir} />
    {/each}
  </div>
</div>
