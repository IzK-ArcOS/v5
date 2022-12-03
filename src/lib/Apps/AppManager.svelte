<script lang="ts">
  import { closeWindow } from "../../ts/applogic/events";
  import { getOpenedStore, WindowStore, WS } from "../../ts/applogic/store";

  let oa: WS = {};
  let oaKeys: string[] = [];

  WindowStore.subscribe(() => {
    oa = getOpenedStore();
    oaKeys = Object.keys(oa);
  });
</script>

<table>
  <tr>
    <td>Name</td>
    <td>ID</td>
    <td>Built-in?</td>
    <td>Close</td>
  </tr>

  {#each oaKeys as key}
    <tr>
      <td>{oa[key].info.name}</td>
      <td>{oa[key].id}</td>
      <td>{oa[key].info.builtin}</td>
      <td>
        <button
          on:click={() => {
            closeWindow(oa[key].id);
          }}
        >
          Close
        </button>
      </td>
    </tr>
  {/each}
</table>
