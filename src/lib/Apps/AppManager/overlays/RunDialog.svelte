<script lang="ts">
  import icon from "../../../../assets/apps/settings/apps.svg";
  import { isDisabled, isOpened } from "../../../../ts/applogic/checks";
  import { openWindow } from "../../../../ts/applogic/events";
  import { WindowStore } from "../../../../ts/applogic/store";
  import { hideOverlay } from "../../../../ts/window/overlay";

  let value: string;

  function run() {
    openWindow(value, true);

    closeThis();
  }

  function closeThis() {
    hideOverlay("run", "AppMan");
  }
</script>

<div class="wrapper">
  <img src={icon} alt="Run" />
  <div class="inner">
    <p class="caption">
      Select the ID of the app you want to run from the following list:
    </p>
    <select bind:value>
      {#each $WindowStore as window}
        {#if !isOpened(window.id) && !window.info.custom && !isDisabled(window.id)}
          <option value={window.id}>{window.id}</option>
        {/if}
      {/each}
    </select>
  </div>
</div>
<div class="actions">
  <div class="inner">
    <button on:click={run} disabled={!value}>Run</button>
    <button on:click={closeThis}>Cancel</button>
  </div>
</div>

<style scoped>
  div.wrapper {
    display: flex;
    padding: 15px;
  }

  div.wrapper img {
    min-width: 32px;
    height: 32px;
    margin-right: 10px;
  }

  div.wrapper p {
    max-width: 250px;
  }

  div.wrapper select {
    width: 100%;
    margin-top: 10px;
  }

  div.actions {
    display: flex;
    padding: 10px;
    padding-top: 0;
  }

  div.actions div.inner {
    margin-left: auto;
  }
</style>
