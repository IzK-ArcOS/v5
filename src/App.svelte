<script lang="ts">
  import { onMount } from "svelte";
  import "./css/main.css";
  import BugReport from "./lib/BugReport.svelte";
  import { logoffToken } from "./ts/api/cred";
  import { getMode, Logo } from "./ts/branding";
  import { applyState, CurrentState } from "./ts/state/main";
  import { committingUserData } from "./ts/userlogic/main";
  import { Busy } from "./ts/env/main";
  import { getDesktopMode } from "./ts/desktop/app";
  import { Log } from "./ts/console";

  let run = false;
  let logo = "";

  onMount(async () => {
    await getMode();
    await getDesktopMode();

    applyState("boot");

    window.addEventListener("beforeunload", logoffToken);

    logo = Logo();
    run = true;
  });
</script>

<svelte:window on:error={(...e) => Log("<svelte:window>", e.join(" - "))} />

<svelte:head>
  <link rel="icon" href={logo} />
</svelte:head>

{#if run}
  <div class="app fullscreen" class:cursor-busy={$committingUserData || $Busy}>
    {#if $CurrentState}
      <svelte:component this={$CurrentState.content} />
    {/if}
    <BugReport />
  </div>
{/if}
