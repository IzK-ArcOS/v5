<script lang="ts">
  import dayjs from "dayjs";
  import { LogItem, LogLevel } from "../../../ts/console";

  export let logItem: LogItem;

  const icons: { [key: number]: string } = {
    0: "error",
    1: "warning",
    2: "info",
    4: "cancel",
  };
</script>

<div class="logitem">
  <div class="level material-icons {LogLevel[logItem.level]}">
    {icons[logItem.level]}
  </div>
  <div class="timestamp">
    {dayjs(logItem.timestamp).format("HH:mm:ss.SSS")}
  </div>
  <div class="msg">{logItem.msg}</div>
</div>
