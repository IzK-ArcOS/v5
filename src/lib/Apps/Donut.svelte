<script lang="ts">
  import { donutSpinning } from "../../ts/applogic/apps/Donut";
  import {
    donutDebugInformation,
    tick,
  } from "../../ts/applogic/apps/Donut/main";

  let value = "";
  let fps = 30;

  setInterval(() => {
    if ($donutSpinning) value = tick();
  }, 1000 / fps);
</script>

<div data-caller="donut-target">
  <pre>{value}</pre>

  <table>
    {#if $donutDebugInformation}
      {#each Object.entries($donutDebugInformation) as entry}
        <tr>
          <td>{entry[0]}</td>
          <td>
            {#if typeof entry[1] == "number"}
              {entry[1].toFixed(8)}
            {:else}
              {entry[1]}
            {/if}
          </td>
        </tr>
      {/each}
    {/if}
  </table>
</div>

<style scoped>
  pre {
    font-family: "Source Code Pro", monospace;
    min-width: 72.5%;
    max-width: 72.5%;
  }

  div {
    width: 100%;
    display: flex;
  }

  table {
    padding: 5px;
    background-color: var(--win-bg);
    border-radius: 7.5px;
    flex-grow: 1;
  }

  table td {
    font-weight: bold;
    min-width: 6em;
  }

  table td + td {
    font-weight: unset;
    width: unset;
  }

  table * {
    font-family: "Source Code Pro", monospace;
  }
</style>
