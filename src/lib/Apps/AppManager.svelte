<script lang="ts">
  import "../../css/desktop/apps/AppManager.css";
  import type { App } from "../../ts/applogic/interface";
  import { getOpenedStore, WindowStore } from "../../ts/applogic/store";
  import Branch from "./AppManager/Branch.svelte";

  let oa: App[] = [];

  WindowStore.subscribe(() => {
    oa = getOpenedStore();
  });
</script>

{#each oa as window}
  {#if !window.parentId}
    <Branch {window} top />
  {/if}
{/each}
