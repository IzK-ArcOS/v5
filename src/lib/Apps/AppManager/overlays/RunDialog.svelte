<script lang="ts">
  import icon from "../../../../assets/apps/settings/apps.svg";
  import { isDisabled, isOpened } from "../../../../ts/applogic/checks";
  import { createProcess, openWindow } from "../../../../ts/applogic/events";
  import { getPID } from "../../../../ts/applogic/pid";
  import { AppStore } from "../../../../ts/applogic/store";
  import { hideOverlay } from "../../../../ts/window/overlay";

  let value: string;

  function run() {
    createProcess(value);

    closeThis();
  }

  function closeThis() {
    // getPID is valid here because we only allow one AppMan process instance
    hideOverlay("run", getPID("AppMan"));
  }
</script>

<div class="wrapper">
  <img src={icon} alt="Run" />
  <div class="inner">
    <p class="caption">
      Select the ID of the app you want to run from the following list:
    </p>
    <select bind:value>
      {#each Object.entries($AppStore) as [id, app]}
        {#if !app.info.custom && !isDisabled(id)}
          <option value={id}>{id} - {app.info.name}</option>
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
