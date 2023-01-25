<script lang="ts">
  import { onMount } from "svelte";
  import "./css/main.css";
  import BugReport from "./lib/BugReport.svelte";
  import DevBar from "./lib/DevBar.svelte";
  import MobileBlock from "./lib/MobileBlock.svelte";
  import Spinner from "./lib/Spinner.svelte";
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
  });

  console.warn = (content: string, ...a: any) =>
    Log({
      source: "[Anonymous Console]",
      msg: content + a.join(" "),
      level: LogLevel.warn,
    });

  console.error = (content: string, ...a: any[]) =>
    Log({
      source: "[Anonymous Console]",
      msg: content + a.join(" "),
      level: LogLevel.error,
    });
</script>

<div class="app fullscreen" class:floating={devmode}>
  {#if $CurrentState}
    <svelte:component this={$CurrentState.content} />
    <DevBar bind:opened={devmode} />
  {/if}
  <BugReport />
</div>
<MobileBlock />
<Spinner height={25}/>