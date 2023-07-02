<script lang="ts">
  import { LogStore } from "../../../../../../ts/console";
  import { LogLevel } from "../../../../../../ts/console/interface";

  export let data: [LogLevel, string];
  export let currentSource: string;
  export let currentFilter: LogLevel;

  export let filter: (filter: LogLevel) => void;

  let disable = false;

  LogStore.subscribe(() => {
    setTimeout(() => {
      let count = 0;

      for (let i = 0; i < $LogStore.length; i++) {
        if (
          $LogStore[i].level == data[0] &&
          $LogStore[i].source == currentSource
        )
          count++;
      }

      disable = !count;
    });
    disable = false;
  });
</script>

<button
  class="filter {LogLevel[data[0]]}"
  on:click={() => filter(data[0])}
  disabled={!currentSource || disable}
  class:selected={data[0] == currentFilter}
>
  <span class="material-icons-round">{data[1]}</span>
</button>
