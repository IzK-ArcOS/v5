<script lang="ts">
  import "./css/main.css";
  import BugReport from "./lib/BugReport.svelte";
  import MobileBlock from "./lib/MobileBlock.svelte";
  import { applyState, CurrentState } from "./ts/state/main";
  import { UserData, UserName } from "./ts/userlogic/interfaces";
  import { createUser, getUserdata } from "./ts/userlogic/main";

  UserData.set(getUserdata("Izaak"));
  UserName.set("Izaak");

  applyState("desktop");

  //createUser("IzK");
</script>

<div class="app fullscreen">
  {#if $CurrentState}
    <svelte:component this={$CurrentState.content} />
  {/if}
  <BugReport />
</div>
<MobileBlock />
