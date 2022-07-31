<script lang="ts">
import type { App } from "../../ts/applogic/interface";

  import { closeWindow } from "../../ts/applogic/events";
  import { getOpenedStore, OpenApps } from "../../ts/applogic/store";

  let oa: App[] = [];

  OpenApps.subscribe(() => {
    oa = getOpenedStore();
  })
</script>

<table>
  <tr>
    <td>Name</td>
    <td>ID</td>
    <td>Built-in?</td>
    <td>Close</td>
  </tr>

  {#each oa as app}
    <tr>
      <td>{app.info.name}</td>
      <td>{app.id}</td>
      <td>{app.info.builtin}</td>
      <td
        ><button
          on:click={() => {
            closeWindow(app.id);
          }}>Close</button
        ></td
      >
    </tr>
  {/each}
</table>
