<script lang="ts">
  import { appManSelectedPid } from "../../../ts/applogic/apps/AppManager/store";
  import { AppStore, ProcessStore } from "../../../ts/applogic/store";
  import { ErrorProcesses } from "../../../ts/errorlogic/app";
</script>

<div class="bottombar">
  <div class="right">
    {#if $appManSelectedPid && $appManSelectedPid > 0}
      <div class="section">
        Snapped: {$ProcessStore[$appManSelectedPid].snapped ? "yes" : "no"}
      </div>
    {/if}
    <div class="section">
      Running: {Object.keys($ProcessStore).length}
    </div>
    <div class="section">
      Loaded: {Object.keys($AppStore).length}
    </div>
    <div class="section">
      Dialogs: {Object.keys($ErrorProcesses).length}
    </div>
  </div>
</div>
