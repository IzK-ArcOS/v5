<script lang="ts">
  import { getServer } from "../ts/api/server";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="reveal">
  <span class="api">{getServer() || location.hostname}</span>
  <span class="place">Hover to show ArcAPI</span>
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
  }

  span span {
    display: none;
  }

  span.reveal:hover span.api {
    display: inline-block;
  }

  span.reveal:not(:hover) span.place {
    display: inline-block;
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
