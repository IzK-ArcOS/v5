<script lang="ts">
  import { CurrentFTSState } from "../../../ts/fts/main";
  import Spinner from "../../../lib/Spinner.svelte";
  import { FTSStates } from "../../../ts/fts/store";
  import { onMount } from "svelte";

  let pageCName = "";
  let keys = [];

  CurrentFTSState.subscribe((v) => {
    if (v) {
      pageCName = v.name.split(" ")[0].toLowerCase();
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
    </div>
  {:else}
    <div class="center-absolute centertext">
      <Spinner height={60} />
    </div>
  {/if}
</div>
