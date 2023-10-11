<script lang="ts">
  import { isPopulatable } from "../../../../../../ts/applogic/checks";
  import { getOriginalIcon } from "../../../../../../ts/applogic/icon";
  import type { App } from "../../../../../../ts/applogic/interface";
  import {
    focusedWindowId,
    getWindow,
  } from "../../../../../../ts/applogic/store";
  import { DefaultIcon } from "../../../../../../ts/icon/apps";
  import { UserData } from "../../../../../../ts/userlogic/interfaces";

  let app: App;

  focusedWindowId.subscribe((v) => {
    if (!v) return;

    app = getWindow(v);
  });
</script>

<div class="current-app">
  {#if $focusedWindowId && app && (!app.info.custom || !app.core || $UserData.sh.showHiddenApps)}
    <img src={getOriginalIcon(app.id)} alt="" />
    <span>{app.info.name}</span>
  {:else}
    <img src={DefaultIcon} alt="" />
    <span>ArcOS Desktop</span>
  {/if}
</div>
