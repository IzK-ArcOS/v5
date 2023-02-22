<script lang="ts">
  import type { App, ContextMenuItem } from "../../../../ts/applogic/interface";

  export let data: ContextMenuItem;
  export let scope: string;
  export let scopeMap: DOMStringMap;
  export let window: App;
  export let show: boolean;

  function trigger() {
    data.action(window, scopeMap, scope);

    show = false;
  }
</script>

<button class="contextmenu-item" on:click={trigger}>
  {data.caption}
</button>
