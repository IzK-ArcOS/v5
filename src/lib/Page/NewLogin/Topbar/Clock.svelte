<script lang="ts">
  import dayjs from "dayjs";

  let time = "";

  setInterval(() => (time = dayjs().format("MMM D, HH:mm")), 500);
</script>

<div class="clock">
  {time}
</div>
