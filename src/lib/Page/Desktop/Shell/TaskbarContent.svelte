<script lang="ts">
  import { onMount } from "svelte";
  import type { Process } from "../../../../ts/applogic/interface";
  import { ProcessStore } from "../../../../ts/applogic/store";
  import Spinner from "../../../Spinner.svelte";

  import TaskbarButton from "../Taskbar/TaskbarButton.svelte";
  import Tray from "../Taskbar/Tray.svelte";

  let show = false;

  let oa: [string, Process][] = [];

  ProcessStore.subscribe((v) => {
    oa = Object.entries(v);
  });

  onMount(() => {
    show = false;

    setTimeout(() => {
      show = true;
    }, 3000);
  });
</script>

<div class="buttons">
  {#each oa as [_, proc]}
    {#if !proc.app.disabled}
      <TaskbarButton process={proc} />
    {/if}
  {/each}
</div>

{#if show}
  <Tray />
{:else}
  <div class="tray">
    <Spinner height={24} />
  </div>
{/if}

<style scoped>
  div.tray {
    padding: 9.5px;
  }
</style>
