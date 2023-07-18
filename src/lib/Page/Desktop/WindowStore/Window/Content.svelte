<script lang="ts">
  import type { App } from "../../../../../ts/applogic/interface";
  import type { AppRuntime } from "../../../../../ts/applogic/runtime/main";
  import { UserData } from "../../../../../ts/userlogic/interfaces";

  export let app: App;
  export let runtime: AppRuntime;
</script>

<div class="body">
  <svelte:component
    this={app.content}
    {app}
    {runtime}
    appdata={$UserData ? $UserData.appdata[app.id] || {} : {}}
  />
  <slot />
</div>
