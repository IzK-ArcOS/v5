<script lang="ts">
  import "../../css/desktop/apps/AppManager.css";
  import { AppPokerData } from "../../ts/applogic/apps/AppManager/Manager";
  import { closeWindow } from "../../ts/applogic/events";
  import type { App } from "../../ts/applogic/interface";
  import { getOpenedStore, WindowStore } from "../../ts/applogic/store";

  let oa: App[] = [];

  function manage(app: App) {
    AppPokerData.set(app);
  }

  WindowStore.subscribe(() => {
    oa = getOpenedStore();
  });
</script>

<table>
  <tr class="head">
    <td />
    <td>Name</td>
    <td>ID</td>
    <td>Built-in?</td>
  </tr>

  {#each oa as app}
    {#if !app.disabled}
      <tr>
        <td><img src={app.info.icon} alt={app.info.name} class="icon" /></td>
        <td>{app.info.name}</td>
        <td>{app.id}</td>
        <td>{app.info.builtin}</td>
        <td>
          <button
            on:click={() => {
              closeWindow(app.id);
            }}
          >
            Close
          </button>
          <button
            on:click={() => {
              manage(app);
            }}
            disabled={$AppPokerData && $AppPokerData.id == app.id}
          >
            Poke
          </button>
        </td>
      </tr>
    {/if}
  {/each}
</table>
