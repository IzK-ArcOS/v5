<script lang="ts">
  import { isOpened } from "../../../ts/applogic/checks";
  import type { App, OverlayableApp } from "../../../ts/applogic/interface";
  import { DefaultIcon } from "../../../ts/icon/apps";

  export let id: string;
  export let overlay: OverlayableApp;
  export let parent: App;
</script>

<div class="indent">
  {#if overlay && isOpened(parent.id)}
    <div class="appinstance" class:closed={!overlay.show}>
      <div>
        <img src={DefaultIcon} alt="" />
      </div>
      <div class="appname">{overlay.info.name}</div>
      <div class="id">
        {parent.id}.{id}
      </div>
    </div>
  {/if}
</div>
