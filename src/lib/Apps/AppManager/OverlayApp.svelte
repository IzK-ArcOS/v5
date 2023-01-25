<script lang="ts">
  import overlays from "../../../assets/apps/appmanager/overlays.svg";
  import type { App, OverlayableApp } from "../../../ts/applogic/interface";

  export let id: string;
  export let overlay: OverlayableApp;
  export let parent: App;
</script>

<div class="indent">
  {#if overlay && overlay.show}
    <div class="appinstance">
      <div>
        <img src={overlays} alt="" />
      </div>
      <div class="appname">{overlay.info.name} (Overlay)</div>
      <div class="id">
        ArcOS.{parent.id}.{id}
      </div>
    </div>
  {/if}
</div>
