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
  <div class="icon">
    {#if data.icon}
      <span class="material-icons-round">{data.icon}</span>
    {:else if data.image}
      <img src={data.image} alt={data.caption} />
    {/if}
  </div>
  {data.caption}
</button>
