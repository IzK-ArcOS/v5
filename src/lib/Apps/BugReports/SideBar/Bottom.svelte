<script lang="ts">
  import type { BugReportsRuntime } from "../../../../ts/applogic/apps/BugReports/runtime";

  export let runtime: BugReportsRuntime;

  function refresh() {
    runtime.refreshStore();
  }
</script>

<div class="bottom">
  <button class="refresh material-icons-round" on:click={refresh}
    >autorenew</button
  >
  <button class="new material-icons-round" on:click={refresh}
  >add</button
>
</div>
