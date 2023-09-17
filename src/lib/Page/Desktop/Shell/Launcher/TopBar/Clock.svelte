<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { UserData } from "../../../../../../ts/userlogic/interfaces";

  let text = "";

  onMount(() => {
    setInterval(() => {
      const tb = $UserData.sh.taskbar;
      const secs = tb.clockSecs && !tb.pos ? ":ss" : "";
      const date = tb.clockDate && !tb.pos ? "MMM D, " : "";
      const time = tb.clock12hr && !tb.pos ? `hh:mm${secs} A` : `HH:mm${secs}`;

      text = dayjs().format(`${date}${time}`);
    }, 500);
  });
</script>

<div class="clock">{text}</div>
