<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";
  import { ProcessStore } from "../../../ts/applogic/store";
  import { ErrorProcesses } from "../../../ts/errorlogic/app";
  import Branch from "./Branch.svelte";
</script>

<div class="apps">
  {#each Object.entries($ProcessStore) as [pid, proc]}
    {#if !proc.parentPid}
      <Branch {proc} top />
    {/if}
  {/each}
  {#each Object.entries(ErrorProcesses) as [pid, proc]}
    <Branch {proc} top error />
  {/each}
</div>
