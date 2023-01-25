<script lang="ts">
  import "../../css/desktop/apps/AppManager.css";
  import type { App } from "../../ts/applogic/interface";
  import { getOpenedStore, WindowStore } from "../../ts/applogic/store";
  import { ErrorWindowStore } from "../../ts/errorlogic/app";
  import Branch from "./AppManager/Branch.svelte";

  let oa: App[] = [];
  let es: App[] = [];

  WindowStore.subscribe(() => {
    oa = getOpenedStore();
  });

  ErrorWindowStore.subscribe((v) => {
    es = v;

    console.log(es);
  });
</script>

{#each oa as window}
  {#if !window.parentId}
    <Branch {window} top />
  {/if}
{/each}
{#each es as error}
  <Branch window={error} top error />
{/each}
