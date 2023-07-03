<script lang="ts">
  import overlays from "../../../assets/apps/default.svg";
  import type {
    OverlayableProcess,
    Process,
  } from "../../../ts/applogic/interface";

  export let id: string;
  export let overlayProcess: OverlayableProcess;
  export let parentProc: Process;
</script>

<div class="indent">
  {#if overlayProcess}
    <div class="appinstance" class:closed={!overlayProcess.show}>
      <div>
        <img src={overlays} alt="" />
      </div>
      <div class="appname">{overlayProcess.overlayableApp.info.name}</div>
      <div class="id">
        {parentProc.app.id}.{id}
      </div>
    </div>
  {/if}
</div>
