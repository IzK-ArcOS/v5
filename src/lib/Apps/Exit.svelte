<script lang="ts">
  import { logoff, restart, shutdown } from "../../ts/desktop/power";
</script>

<button on:click={shutdown}>Shutdown</button>
<button on:click={logoff}>Logoff</button>
<button on:click={restart}>Restart</button>
