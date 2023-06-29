<script lang="ts">
  import { LOClicks } from "../../../ts/applogic/apps/LightsOff/game";
  import { LO_LEVEL } from "../../../ts/applogic/apps/LightsOff/grid/levels";
  import type { App } from "../../../ts/applogic/interface";
  import { UserData } from "../../../ts/userlogic/interfaces";

  export let app: App;
  export let load: () => void;

  function reset() {
    $UserData.appdata[app.id] = null;

    load();
  }
</script>

<div class="statistics">
  <button class="reset-game" on:click={reset}>Reset</button>
  <div class="right">
    <div class="stat">Level {$LO_LEVEL}</div>
    <div class="stat">{$LOClicks} Click{$LOClicks == 1 ? "" : "s"}</div>
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
