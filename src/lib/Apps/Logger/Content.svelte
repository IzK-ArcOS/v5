<script lang="ts">
  import type { LogItem } from "../../../ts/console";
  import Actions from "./Content/Actions.svelte";
  import Items from "./Content/Items.svelte";

  export let currentSource: string;
  export let logItems: LogItem[];
  export let setView: (source: string) => void;
</script>

<div class="content">
  <Actions bind:currentSource bind:logItems bind:setView />
  <Items bind:logItems />
</div>
