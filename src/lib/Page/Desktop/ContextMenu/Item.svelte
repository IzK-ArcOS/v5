<script lang="ts">
  import { onMount } from "svelte";
  import type { App, ContextMenuItem } from "../../../../ts/applogic/interface";

  export let data: ContextMenuItem;
  export let scope: string;
  export let scopeMap: DOMStringMap;
  export let window: App;
  export let show: boolean;

  let active = false;

  function trigger() {
    if (data.action) data.action(window, scopeMap, scope);

    show = false;

    update();
  }

  onMount(update);

  async function update() {
    if (!data.isActive) return (active = false);

    active = await data.isActive(window, scopeMap, scope);
  }
</script>

{#if data.sep}
  <hr />
{:else}
  <button class="contextmenu-item" on:click={trigger} class:active>
    <div class="icon">
      {#if data.icon}
        <span class="material-icons-round">{data.icon}</span>
      {:else if data.image}
        <img src={data.image} alt={data.caption} />
      {/if}
    </div>
    {data.caption}
  </button>
{/if}
