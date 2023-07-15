<script lang="ts">
  import type { ServerSelectOption } from "../../../ts/api/interface";
  import { applyState } from "../../../ts/state/main";

  export let servers: ServerSelectOption[] = [];
  export let selected = "";

  function fts() {
    applyState("fts");
  }

  function restart() {
    location.reload();
  }

  function apply() {
    localStorage.setItem("arcos-current-server", selected);

    restart();
  }
</script>

{#if servers && servers.length}
  <div class="actions">
    <button on:click={fts}>
      <span>Add Server</span>
      <span class="material-icons-round">add</span>
    </button>
    <button on:click={restart}>
      <span>Restart</span>
      <span class="material-icons-round">sync</span>
    </button>
    <button class="clr-blue" on:click={apply}>
      <span>Continue</span>
      <span class="material-icons-round">arrow_forward_ios</span>
    </button>
  </div>
{/if}
