<script lang="ts">
  import "@css/desktop/apps/AppInfo.css";
  import { AppInfoId as id } from "$$ts/applogic/apps/AppInfo";
  import { AppPokerData } from "$$ts/applogic/apps/AppManager/Manager";
  import { isDisabled } from "$$ts/applogic/checks";
  import { disableApp, enableApp } from "$$ts/applogic/enabling";
  import { openWindow } from "$$ts/applogic/events";
  import { getAppIcon } from "$$ts/applogic/icon";
  import { SystemApps } from "$$ts/applogic/imports";
  import type { App } from "$$ts/applogic/interface";
  import { getWindow, WindowStore } from "$$ts/applogic/store";

  let data: App;
  let isEnabled = true;
  let disablePoke = false;

  function updateState() {
    if (isEnabled) enableApp($id);
    else disableApp($id);

    data = getWindow($id);

    if (!data) return;

    isEnabled = !getWindow($id).disabled;
  }

  id.subscribe(update);
  WindowStore.subscribe(update);

  function update() {
    if (!$id) return;

    data = getWindow($id);

    if (!data) return;

    isEnabled = !getWindow($id).disabled;

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
        {#if data.parentId}
          ({data.parentId}.{data.id})
        {:else}
          ({data.id})
        {/if}
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
        <div class="controls">
          <button class="material-icons-round" disabled={!data.controls.min}>
            minimize
          </button>
          <button class="material-icons-round" disabled={!data.controls.max}>
            crop_square
          </button>
          <button class="material-icons-round" disabled={!data.controls.cls}>
            close
          </button>
        </div>
      </div>
    </div>
    <div class="property">
      <div>Actions</div>
      <div class="value">
        <button
          on:click={() => openWindow($id)}
          disabled={data.opened || data.disabled}
        >
          Open
        </button>
        <button
          on:click={() => AppPokerData.set(data)}
          disabled={data.disabled || disablePoke}
        >
          Poke
        </button>
      </div>
    </div>
  </div>
{/if}
