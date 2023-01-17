<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";
  import type { LogItem } from "../../../ts/console";
  import Actions from "./Content/Actions.svelte";
  import Items from "./Content/Items.svelte";

  export let app: App;
  export let currentSource: string;
  export let logItems: LogItem[];
  export let setView: (source: string) => void;

  let updating = false;
</script>

<div class="content">
  <Actions bind:currentSource bind:logItems bind:setView bind:updating />
  <Items bind:logItems bind:updating {app} />
</div>
