<script lang="ts">
  import type { App } from "../../../../../ts/applogic/interface";

  export let app: App;
</script>

<div class="body">
  <svelte:component this={app.content} {app} />
  <slot />
</div>
