<script lang="ts">
  import { onMount } from "svelte";
  import "./css/main.css";
  import BugReport from "./lib/BugReport.svelte";
  import { logoffToken } from "./ts/api/cred";
  import { ARCOS_MODE, getMode, Logo } from "./ts/branding";
  import { ARCOS_BUILD, getBuild } from "./ts/branding/build";
  import { Log } from "./ts/console";
  import { LogLevel } from "./ts/console/interface";
  import { DESKTOP_MODE, getDesktopMode } from "./ts/desktop/app";
  import { ArcOSVersion, Busy } from "./ts/env/main";
  import { CRASHING, handleWindowError } from "./ts/reporting/crash";
  import type { State } from "./ts/state/interfaces";
  import { applyState, CurrentState } from "./ts/state/main";
  import { onStateChange } from "./ts/state/watch";
  import { committingUserData } from "./ts/userlogic/main";

  let run = false;
  let logo = "";
  let state: State = CurrentState;

  $: state;

  onMount(async () => {
    await getMode();
    await getDesktopMode();
    await getBuild();

    onStateChange((s) => {
      if (!s) return;

      state = s;
    });

    Log(
      "ArcOS",
      `ARCOS_VERSION = ${ArcOSVersion} | ARCOS_MODE = ${ARCOS_MODE} | ARCOS_BUILD = ${ARCOS_BUILD} | DESKTOP_MODE = ${DESKTOP_MODE} `,
      LogLevel.warn
    );

    applyState("boot");

    window.addEventListener("beforeunload", logoffToken);

    logo = Logo();
    run = true;

    window.onunhandledrejection = (e: PromiseRejectionEvent) => {
      handleWindowError(e);
    };

    window.onbeforeunload = () => {
      const state = CurrentState.key;

      if (
        DESKTOP_MODE !== "desktop" &&
        (state == "desktop" || state == "arcterm")
      )
        return false;
    };
  });
</script>

<svelte:window on:error={(e) => handleWindowError(e)} />

<svelte:head>
  <link rel="icon" href={logo} />
</svelte:head>

{#if run && !navigator.userAgent.toLowerCase().includes("firefox")}
  <div
    class="app fullscreen theme-dark"
    class:noglass={navigator.userAgent.toLowerCase().includes("firefox")}
    class:noani={navigator.userAgent.toLowerCase().includes("firefox")}
    class:cursor-busy={$committingUserData || $Busy}
    class:rotate={ARCOS_MODE == "siege"}
    class:gray={$CRASHING}
  >
    {#if state}
      <svelte:component this={state.content} thisState={state} />
    {/if}
    <BugReport />
  </div>
{/if}
