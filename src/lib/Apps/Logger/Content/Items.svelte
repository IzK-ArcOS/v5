<script lang="ts">
  import type { App } from "../../../../ts/applogic/interface";
  import type { LogItem } from "../../../../ts/console";
  import type { ScopedAppData } from "../../../../ts/userlogic/interfaces";
  import LogItemSvelte from "../LogItem.svelte";

  export let app: App;
  export let logItems: LogItem[];
  export let updating: boolean;
  export let appdata: ScopedAppData;
</script>

<div
  class="items"
  class:cflex={!logItems.length}
  class:monospace={!!appdata.monospace}
>
  {#if !updating}
    {#each logItems as logItem}
      <LogItemSvelte {logItem} />
    {/each}
  {/if}

  {#if !logItems.length}
    <div class="noitems">
      <img src={app.info.icon} alt={app.info.name} />
      <p>No items found.</p>
    </div>
  {/if}
</div>
