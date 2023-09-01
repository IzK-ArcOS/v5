<script lang="ts">
  import dayjs from "dayjs";
  import { onMount } from "svelte";

  let time = "";

  onMount(() => {
    setInterval(() => {
      time = dayjs().format("MMM D, HH:mm");
    }, 500);
  });
</script>

<div class="clock">{time}</div>
