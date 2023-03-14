<script lang="ts">
  import { donutDebugInformation } from "../../../../ts/applogic/apps/Donut/main";
</script>

<table>
  {#if $donutDebugInformation}
    {#each Object.entries($donutDebugInformation) as entry}
      <tr>
        <td>{entry[0]}</td>
        <td>{entry[1]}</td>
      </tr>
    {/each}
  {/if}
</table>

<style scoped>
  table {
    width: 100%;
  }

  table td {
    font-weight: bold;
    width: 5em;
  }

  table td + td {
    font-weight: unset;
    width: unset;
  }

  table * {
    font-family: "Source Code Pro", monospace;
  }
</style>
