<script lang="ts">
  import { ConnectedServer } from "../../../../ts/api/main";
  import CreateButton from "./Selector/CreateButton.svelte";
  import Populator from "./Selector/Populator.svelte";
</script>

<div class="user-selector">
  <Populator />
  {#if $ConnectedServer}
    <CreateButton />
  {/if}
</div>
