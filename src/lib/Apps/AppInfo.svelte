<script lang="ts">
  import "../../css/desktop/apps/AppInfo.css";
  import { AppInfoData as data } from "../../ts/applogic/apps/AppInfo";
  import { SystemApps } from "../../ts/applogic/imports";
  import { errorMessage } from "../../ts/errorlogic/main";
  import { UserData } from "../../ts/userlogic/interfaces";

  function disableApp() {
    if (SystemApps.includes($data.id)) {
      return errorMessage(
        "Can't disable application",
        `App "${$data.id}"is a system application. System applications are core to ArcOS and cannot be disabled without breaking certain functionality.`,
        { caption: "OK", action: () => {} }
      );
    }
    if (!$UserData.disabledApps.includes($data.id))
      $UserData.disabledApps.push($data.id);

    console.dir($UserData);
  }
</script>

{#if $data}
  <div class="name">
    <div>
      <img src={$data.info.icon} alt={$data.info.name} />
    </div>
    <div>
      <p class="appname">{$data.info.name}</p>
      <p class="description">
        {$data.info.description} ({$data.id || "<unknown>"})
      </p>
    </div>
    <div><button on:click={disableApp}>Disable</button></div>
  </div>
  <div class="properties">
    <div class="property">
      <div>Size:</div>
      <div class="value">{$data.size.w}x{$data.size.h}</div>
    </div>
    <div class="property">
      <div>Minimal size:</div>
      <div class="value">{$data.minSize.w}x{$data.minSize.h}</div>
    </div>

    <div class="property">
      <div>Maximal size:</div>
      <div class="value">{$data.maxSize.w}x{$data.maxSize.h}</div>
    </div>
    <hr />
    <div class="property">
      <div>Start position:</div>
      <div class="value">{$data.pos.x}x{$data.pos.y}</div>
    </div>
    <div class="property">
      <div>Window controls:</div>
      <div class="value">
        <button class="material-icons" disabled={!$data.controls.min}>
          minimize
        </button>
        <button class="material-icons" disabled={!$data.controls.max}>
          crop_square
        </button>
        <button class="material-icons" disabled={!$data.controls.cls}>
          close
        </button>
      </div>
    </div>
  </div>
{/if}
