<script lang="ts">
  import { onMount } from "svelte";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import dayjs from "dayjs";

  export let hasClock: boolean;
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

{#if hasClock}
  <div class="clock" data-contextmenu="clockcontext">{text}</div>
{/if}
