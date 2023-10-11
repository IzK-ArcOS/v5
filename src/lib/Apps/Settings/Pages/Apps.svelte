<script lang="ts">
  import "../../../../css/desktop/apps/settings/apps.css";
  import { isPopulatable } from "../../../../ts/applogic/checks";
  import { WindowStore } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import AppButton from "./Apps/AppButton.svelte";

  let apps = [];

  WindowStore.subscribe(
    (v) => (apps = [...v].sort((a, b) => (a.info.name > b.info.name ? 0 : -1)))
  );

  function update() {
    $WindowStore = $WindowStore;
  }
</script>

<div class="page-apps">
  <div class="apps">
    {#each apps as app}
      {#if isPopulatable(app) || $UserData.sh.showHiddenApps}
        <AppButton {app} />
      {/if}
    {/each}
  </div>

  <div class="apps-hidden-toggle">
    <p>{$WindowStore.length} applications</p>
    <span class="right">
      <p class="label">Show hidden apps</p>
      <input
        type="checkbox"
        class="switch"
        bind:checked={$UserData.sh.showHiddenApps}
        on:click={update}
      />
    </span>
  </div>
</div>
