<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import { UserData } from "../../../../../../ts/userlogic/interfaces";

  let time = "";

  onMount(() => {
    setInterval(() => {
      time = dayjs().format(
        $UserData.sh.taskbar.clockSecs ? "MMM D, HH:mm:ss" : "MMM D, HH:mm"
      );
    }, 500);
  });
</script>

<div class="clock">{time}</div>
