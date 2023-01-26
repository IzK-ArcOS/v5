<script lang="ts">
  import { log, LogLevel } from "../../../../../../ts/console";

  export let data: [LogLevel, string];
  export let currentSource: string;
  export let currentFilter: LogLevel;

  export let filter: (filter: LogLevel) => void;

  let disable = false;

  log.subscribe(() => {
    setTimeout(() => {
      let count = 0;

      for (let i = 0; i < $log.length; i++) {
        if ($log[i].level == data[0] && $log[i].source == currentSource)
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
