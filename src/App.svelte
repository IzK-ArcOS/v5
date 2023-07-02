<script lang="ts">
  import "./css/main.css";
  import BugReport from "./lib/BugReport.svelte";
  import { logoffToken } from "./ts/api/cred";
  import { applyState, CurrentState } from "./ts/state/main";

  applyState("boot");

  window.addEventListener("beforeunload", logoffToken);
</script>

<div class="app fullscreen">
  {#if $CurrentState}
    <svelte:component this={$CurrentState.content} />
  {/if}
  <BugReport />
</div>
