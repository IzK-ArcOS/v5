<script lang="ts">
  import "../../css/desktop/apps/AppInfo.css";
  import { AppInfoId as id } from "../../ts/applogic/apps/AppInfo";
  import { isDisabled } from "../../ts/applogic/checks";
  import { disableApp, enableApp } from "../../ts/applogic/enabling";
  import { createProcess } from "../../ts/applogic/events";
  import { getAppIcon } from "../../ts/applogic/icon";
  import { SystemApps } from "../../ts/applogic/imports/store";
  import type { App } from "../../ts/applogic/interface";
  import { AppStore, ProcessStore, getWindow } from "../../ts/applogic/store";

  let data: App;
  let isEnabled = true;
  let disablePoke = false;
  let d = "(unset)";

  function updateState() {
    if (isEnabled) enableApp($id);
    else disableApp($id);

    data = $AppStore[$id];

    if (!data) return;

    isEnabled = !data.disabled;
  }

  id.subscribe(update);
  AppStore.subscribe(update);
  ProcessStore.subscribe(update);

  function update() {
    if (!$id) return;

    data = $AppStore[$id];

    if (!data) return;

    isEnabled = !data.disabled;

    disablePoke = isDisabled("AppPoker");
  }
</script>

{#if data}
  <div class="name">
    <div>
      <img src={getAppIcon(data)} alt={data.info.name} />
    </div>
    <div>
      <p class="appname">{data.info.name}</p>
      <p class="description">
        {data.info.description}
        ({data.id})
      </p>
    </div>
    <div class="actions">
      <input
        type="checkbox"
        class="switch"
        disabled={SystemApps.includes($id)}
        bind:checked={isEnabled}
        on:change={updateState}
      />
    </div>
  </div>
  <div class="properties">
    <div class="property">
      <div>Size:</div>
      <div class="value">
        {data.initialSize.w || d}x{data.initialSize.h || d}
      </div>
    </div>
    <div class="property">
      <div>Minimal size:</div>
      <div class="value">{data.minSize.w || d}x{data.minSize.h || d}</div>
    </div>

    <div class="property">
      <div>Maximal size:</div>
      <div class="value">{data.maxSize.w || d}x{data.maxSize.h || d}</div>
    </div>
    <hr />
    <div class="property">
      <div>Core Application:</div>
      <div class="value">{data.core}</div>
    </div>
    <div class="property">
      <div>Window controls:</div>
      <div class="value">
        <div class="controls">
          <button
            class="material-icons-round"
            disabled={!data.controls.minimized}
          >
            minimize
          </button>
          <button
            class="material-icons-round"
            disabled={!data.controls.maximized}
          >
            crop_square
          </button>
          <button class="material-icons-round" disabled={!data.controls.close}>
            close
          </button>
        </div>
      </div>
    </div>
    <div class="property">
      <div>Actions</div>
      <div class="value">
        <button
          on:click={() => createProcess($id)}
          disabled={data.disabled || data.core}
        >
          Spawn Process
        </button>
      </div>
    </div>
  </div>
{/if}
