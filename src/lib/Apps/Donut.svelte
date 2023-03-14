<script lang="ts">
  import { donutSpinning } from "../../ts/applogic/apps/Donut";
  import { tick } from "../../ts/applogic/apps/Donut/main";

  let value = "";
  let fps = 30;

  setInterval(() => {
    if ($donutSpinning) value = tick();
  }, 1000 / fps);
</script>

<pre>{value}</pre>

<style scoped>
  pre {
    font-family: "Source Code Pro", monospace;
  }
</style>
