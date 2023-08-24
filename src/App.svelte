<script lang="ts">
  import { onMount } from "svelte";
  import "./css/main.css";
  import BugReport from "./lib/BugReport.svelte";
  import { logoffToken } from "./ts/api/cred";
  import { ARCOS_MODE, getMode, Logo } from "./ts/branding";
  import { getDesktopMode } from "./ts/desktop/app";
  import { Busy } from "./ts/env/main";
  import { handleWindowError } from "./ts/reporting/crash";
  import { applyState, CurrentState } from "./ts/state/main";
  import { committingUserData } from "./ts/userlogic/main";
  import { getBuild } from "./ts/branding/build";
  import { makeNotification } from "./ts/notiflogic/main";

  let run = false;
  let logo = "";

  onMount(async () => {
    await getMode();
    await getDesktopMode();
    await getBuild();

    applyState("boot");

    window.addEventListener("beforeunload", logoffToken);

    logo = Logo();
    run = true;

    window.onunhandledrejection = (e: PromiseRejectionEvent) => {
      handleWindowError(e);
    };

    window.onbeforeunload = () => {
      makeNotification({
        icon: "warning",
        title: "Hold up!",
        message:
          "It's advised to leave ArcOS using the power options in the start menu. Closing it forcefully can result in a loss of unsaved data, you've been warned.",
        buttons: [],
        timeout: 10000,
      });

      return false;
    };
  });
</script>

<svelte:window on:error={(e) => handleWindowError(e)} />

<svelte:head>
  <link rel="icon" href={logo} />
</svelte:head>

{#if run}
  <div
    class="app fullscreen"
    class:cursor-busy={$committingUserData || $Busy}
    class:rotate={ARCOS_MODE == "siege"}
  >
    {#if $CurrentState}
      <svelte:component this={$CurrentState.content} />
    {/if}
    <BugReport />
  </div>
{/if}
