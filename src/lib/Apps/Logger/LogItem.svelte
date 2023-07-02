<script lang="ts">
  import dayjs from "dayjs";
  import { LogItem, LogLevel } from "../../../ts/console/interface";

  export let logItem: LogItem;

  const icons: { [key: number]: string } = {
    0: "info",
    1: "warning",
    2: "error",
    3: "cancel",
  };
</script>

<div class="logitem">
  <div class="level material-icons-round {LogLevel[logItem.level]}">
    {icons[logItem.level]}
  </div>
  <div class="timestamp">
    {dayjs(logItem.timestamp).format("HH:mm:ss.SSS")}
  </div>
  <div class="msg">{logItem.msg}</div>
</div>
