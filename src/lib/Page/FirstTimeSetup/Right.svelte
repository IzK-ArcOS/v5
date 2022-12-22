<script lang="ts">
  import { CurrentFTSState } from "../../../ts/fts/main";
  import Spinner from "../../../lib/Spinner.svelte";
  import ProgressBar from "./Nav/ProgressBar.svelte";
  import { FTSStates } from "../../../ts/fts/store";
  import { onMount } from "svelte";

  let pageCName = "";
  let keys = [];
  let i = 1;
  let m = 1;

  CurrentFTSState.subscribe((v) => {
    if (v) {
      pageCName = v.name.split(" ")[0].toLowerCase();
      i = keys.indexOf(v.key) + 1;
      m = keys.length;
      console.warn(v, keys, i, m);
    }
  });

  onMount(() => {
    keys = [];

    for (const entry of FTSStates) {
      keys.push(entry[0]);
    }
  });
</script>

<div class="right">
  {#if $CurrentFTSState}
    <div class="page {pageCName}">
      <svelte:component this={$CurrentFTSState.content} />
      <ProgressBar max={m} val={i} />
    </div>
  {:else}
    <div class="center-absolute centertext">
      <Spinner height={60} />
    </div>
  {/if}
</div>
