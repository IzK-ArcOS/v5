<script lang="ts">
  import dayjs from "dayjs";
  import { LogItem, LogLevel } from "../../../ts/console";

  export let logItem: LogItem;
</script>

<div class="logitem">
  <div class="timestamp">
    {dayjs(logItem.timestamp).format("HH:mm:ss.SSS")}
  </div>
  <div class="level {LogLevel[logItem.level]}">
    {LogLevel[logItem.level].toUpperCase()}
  </div>
  <!-- <div class="source">{logItem.source}</div> -->
  <div class="msg">{logItem.msg}</div>
</div>
