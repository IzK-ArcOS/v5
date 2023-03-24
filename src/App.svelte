<script lang="ts">
  import { onMount } from "svelte";
  import "./css/main.css";
  import BugReport from "./lib/BugReport.svelte";
  import DevBar from "./lib/DevBar.svelte";
  import { logoffToken } from "./ts/api/cred";
  import { assignHooks } from "./ts/applogic/aftermarket/hooks";
  import { assignHookUpdateListeners } from "./ts/applogic/aftermarket/hooks/updaters";
  import { Log, LogLevel } from "./ts/console";
  import { assignDevMutators } from "./ts/devmode/mutators";
  import { DevModeOverride, updateDevModeProps } from "./ts/devmode/props";
  import { dmMutators } from "./ts/devmode/store/mutators";
  import { dmTriggers } from "./ts/devmode/store/triggers";
  import { applyState, CurrentState } from "./ts/state/main";

  let devmode = false;

  DevModeOverride.subscribe((v) => {
    if (!v && !import.meta.env.DEV) devmode = false;
  });

  applyState("boot");

  onMount(() => {
    dmMutators.unshift({
      caption: "CurrentState",
      store: CurrentState,
      value: "key",
      fallback: "unknown",
    });

    dmTriggers.unshift(CurrentState);

    updateDevModeProps();
    assignDevMutators();
    assignHooks();
    assignHookUpdateListeners();
  });

  console.warn = (content: string, ...a: any) =>
    Log({
      source: "Console",
      msg: content + a.join(" "),
      level: LogLevel.warn,
    });

  console.error = (content: string, ...a: any[]) =>
    Log({
      source: "Console",
      msg: content + a.join(" "),
      level: LogLevel.error,
    });

  window.addEventListener("beforeunload", logoffToken);
</script>

<div class="app fullscreen" class:floating={devmode}>
  {#if $CurrentState}
    <svelte:component
      this={$CurrentState.content}
    /><!-- 
    <DevBar bind:opened={devmode} /> -->
  {/if}
  <BugReport />
</div>
