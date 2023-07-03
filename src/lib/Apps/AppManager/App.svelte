<script lang="ts">
  import { appManSelectedPid } from "../../../ts/applogic/apps/AppManager/store";
  import { isDisabled, isOpened } from "../../../ts/applogic/checks";
  import { getAppIcon, getOriginalIcon } from "../../../ts/applogic/icon";
  import type { App, Process } from "../../../ts/applogic/interface";

  export let proc: Process;
  export let error = false;

  function select() {
    $appManSelectedPid = proc.id;
  }
</script>

{#if proc && proc.app && (!isDisabled(proc.app.id) || error)}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="appinstance"
    on:click={select}
    class:selected={$appManSelectedPid == proc.id}
  >
    <div>
      <img src={getOriginalIcon(proc.id) || getAppIcon(proc.app)} alt="" />
    </div>
    <div class="appname">
      {proc.app.info.name}
      {#if error}
        (Dialog)
      {/if}
    </div>
    <div class="id">
      {proc.app.id} ({proc.id})
    </div>
  </div>
{/if}
