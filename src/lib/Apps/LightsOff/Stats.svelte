<script lang="ts">
  import { onMount } from "svelte";
  import type { LightsOffRuntime } from "../../../ts/applogic/apps/LightsOff/runtime";
  import type { App } from "../../../ts/applogic/interface";
  import { UserData } from "../../../ts/userlogic/interfaces";

  export let app: App;
  export let runtime: LightsOffRuntime;

  let level = 0;
  let clicks = 0;

  onMount(() => {
    runtime.LEVEL.subscribe((v) => (level = v));
    runtime.Clicks.subscribe((v) => (clicks = v));
  });

  function reset() {
    $UserData.appdata[app.id] = null;

    runtime.loadData();
  }
</script>

<div class="statistics">
  <button class="reset-game" on:click={reset}>Reset</button>
  <div class="right">
    <div class="stat">Level {level + 1}</div>
    <div class="stat">{clicks} Click{clicks == 1 ? "" : "s"}</div>
  </div>
</div>

<style scoped>
  div.statistics {
    border-bottom: var(--button-glass-bg) 1px solid;
    margin-bottom: 10px;
    padding: 10px 0;
    padding-top: 0;
    display: flex;
    align-items: center;
  }

  div.statistics div.right {
    background-color: var(--button-glass-bg);
    height: 30px;
    margin-left: auto;
    display: flex;
    gap: 10px;
    border: var(--button-glass-bg) 1px solid;
    padding: 0 10px;
    border-radius: 7.5px;
  }

  div.statistics div.right div.stat {
    line-height: 28px;
  }
  div.statistics div.right div.stat + div.stat {
    border-left: var(--button-glass-bg) 1px solid;
    padding-left: 10px;
  }
</style>
