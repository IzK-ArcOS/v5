<script lang="ts">
  import "../../css/desktop/apps/AppInfo.css";
  import { AppInfoId as id } from "../../ts/applogic/apps/AppInfo";
  import { disableApp, enableApp } from "../../ts/applogic/enabling";
  import type { App } from "../../ts/applogic/interface";
  import { getWindow, WindowStore } from "../../ts/applogic/store";
  import { UserData } from "../../ts/userlogic/interfaces";

  let data: App;

  function disable() {
    disableApp($id);
  }

  function enable() {
    enableApp($id);
  }

  WindowStore.subscribe((v) => {
    data = getWindow($id);
  });
</script>

{#if data}
  <div class="name">
    <div>
      <img src={data.info.icon} alt={data.info.name} />
    </div>
    <div>
      <p class="appname">{data.info.name}</p>
      <p class="description">
        {data.info.description} ({data.id || "<unknown>"})
      </p>
    </div>
    <div class="actions">
      <button
        on:click={disable}
        disabled={$UserData.disabledApps.includes(data.id)}
      >
        Disable
      </button>
      <button
        on:click={enable}
        disabled={!$UserData.disabledApps.includes(data.id)}
      >
        Enable
      </button>
    </div>
  </div>
  <div class="properties">
    <div class="property">
      <div>Size:</div>
      <div class="value">{data.size.w}x{data.size.h}</div>
    </div>
    <div class="property">
      <div>Minimal size:</div>
      <div class="value">{data.minSize.w}x{data.minSize.h}</div>
    </div>

    <div class="property">
      <div>Maximal size:</div>
      <div class="value">{data.maxSize.w}x{data.maxSize.h}</div>
    </div>
    <hr />
    <div class="property">
      <div>Start position:</div>
      <div class="value">{data.pos.x}x{data.pos.y}</div>
    </div>
    <div class="property">
      <div>Window controls:</div>
      <div class="value">
        <button class="material-icons" disabled={!data.controls.min}>
          minimize
        </button>
        <button class="material-icons" disabled={!data.controls.max}>
          crop_square
        </button>
        <button class="material-icons" disabled={!data.controls.cls}>
          close
        </button>
      </div>
    </div>
  </div>
{/if}
