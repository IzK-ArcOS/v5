<script lang="ts">
  import "./css/main.css";
  import BugReport from "./lib/BugReport.svelte";
  import { applyState, CurrentState } from "./ts/state/main";
import { createUser } from "./ts/userlogic/main";

  applyState("boot");

  createUser("IzK")
</script>

<div class="app fullscreen">
{#if $CurrentState}
  <svelte:component this={$CurrentState.content} />
{/if}
<BugReport />
</div>