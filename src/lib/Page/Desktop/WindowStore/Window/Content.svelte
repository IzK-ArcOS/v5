<script lang="ts">
  import type { App } from "$$ts/applogic/interface";
  import { UserData } from "$$ts/userlogic/interfaces";

  export let app: App;
</script>

<div class="body">
  <svelte:component
    this={app.content}
    {app}
    appdata={$UserData.appdata[app.id] || {}}
  />
  <slot />
</div>
