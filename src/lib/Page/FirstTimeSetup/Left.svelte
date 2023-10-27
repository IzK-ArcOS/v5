<script lang="ts">
  import { CurrentFTSState } from "../../../ts/fts/main";
  import { FTSStates } from "../../../ts/fts/store";
  import { ArcTermIcon } from "../../../ts/icon/apps";
  import { applyState } from "../../../ts/state/main";

  function arcterm() {
    applyState("arcterm");
  }
</script>

<div class="left">
  {#each [...FTSStates] as [key, value]}
    <div
      class="state"
      class:activated={$CurrentFTSState && $CurrentFTSState.key == key}
    >
      <img src={value.image} alt={value.name} />
      {value.name}
    </div>
  {/each}
  <button class="arcterm" on:click={arcterm}>
    <img src={ArcTermIcon} alt="ArcTerm" />
    <span>Launch ArcTerm</span>
  </button>
</div>
