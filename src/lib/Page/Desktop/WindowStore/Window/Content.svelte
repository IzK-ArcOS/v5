<script lang="ts">
  import type { App, Process } from "../../../../../ts/applogic/interface";
  import { UserData } from "../../../../../ts/userlogic/interfaces";

  export let process: Process;
</script>

<div class="body">
  <svelte:component
    this={process.app.content}
    app={process.app}
    pid={process.id}
    {process}
    appdata={$UserData.appdata[process.app.id] || {}}
  />
  <slot />
</div>
