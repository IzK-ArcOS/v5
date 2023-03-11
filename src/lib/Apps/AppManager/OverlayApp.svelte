<script lang="ts">
  import overlays from "../../../assets/apps/default.svg";
  import type { App, OverlayableApp } from "../../../ts/applogic/interface";

  export let id: string;
  export let overlay: OverlayableApp;
  export let parent: App;
</script>

<div class="indent">
  {#if overlay}
    <div class="appinstance" class:closed={!overlay.show}>
      <div>
        <img src={overlays} alt="" />
      </div>
      <div class="appname">{overlay.info.name}</div>
      <div class="id">
        {parent.id}.{id}
      </div>
    </div>
  {/if}
</div>
