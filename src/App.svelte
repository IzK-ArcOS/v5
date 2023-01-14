<script lang="ts">
  import "./css/main.css";
  import BugReport from "./lib/BugReport.svelte";
  import DevBar from "./lib/DevBar.svelte";
  import MobileBlock from "./lib/MobileBlock.svelte";
  import { applyState, CurrentState } from "./ts/state/main";

  let devmode = false;

  applyState("boot");
</script>

<div class="app fullscreen" class:floating={devmode}>
  {#if $CurrentState}
    <svelte:component this={$CurrentState.content} />
  {/if}
  <BugReport />
  <DevBar bind:opened={devmode} />
</div>
<MobileBlock />
