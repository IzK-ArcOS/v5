<script lang="ts">
  import { getServer } from "../ts/api/server";

  export let api = getServer();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="reveal">
  <span class="api">
    {#if api}
      {api || "(Not connected)"}
    {:else}
      <slot />
    {/if}
  </span>
  <span class="placeholder" />
</span>

<style scoped>
  span {
    font: inherit !important;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: inherit;
    display: inline-flex;
    align-items: center;
  }

  span span {
    display: inline-block;
  }

  span.reveal:not(:hover) span.api {
    opacity: 0;
    visibility: hidden;
  }

  span.reveal:hover span.api {
    opacity: 1;
    visibility: visible;
  }

  span.reveal:hover span.placeholder {
    opacity: 0;
    visibility: hidden;
  }

  span.reveal span.placeholder {
    display: inline-block;
    width: 100%;
    position: absolute;
    left: 0px;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    line-height: inherit;
    background-color: currentColor;
  }
  /* 
  span.reveal:not(:hover) span.place {
    opacity: 1;
    visibility: visible;
    pointer-events: initial;
  }

  span.reveal:hover span.place {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  span.reveal:hover span.api {
    opacity: 1;
    visibility: visible;
    pointer-events: initial;
  } */
</style>
