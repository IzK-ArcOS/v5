<script lang="ts">
  import "./css/main.css";
  import BugReport from "./lib/BugReport.svelte";
  import DevBar from "./lib/DevBar.svelte";
  import MobileBlock from "./lib/MobileBlock.svelte";
  import { applyState, CurrentState } from "./ts/state/main";

  applyState("boot");
</script>

<div class="app fullscreen">
  {#if $CurrentState}
    <svelte:component this={$CurrentState.content} />
  {/if}
  <BugReport />
  <DevBar />
</div>
<MobileBlock />
