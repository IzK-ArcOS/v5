<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/experiments.css";
  import {
    Experiments,
    getExperiments,
  } from "../../ts/desktop/experiments/main";
  import { UserData } from "../../ts/userlogic/interfaces";

  onMount(async () => {
    if (!$UserData.appdata.experiments) $UserData.appdata.experiments = {};

    await getExperiments();
  });
</script>

{#if $UserData.appdata.experiments}
  {#each Object.entries($Experiments) as entry}
    <div class="experiment">
      <div class="info">
        <h3 class="title">{entry[1].title}</h3>
        <p class="description">{entry[1].description}</p>
      </div>
      <div class="right">
        <input
          type="checkbox"
          class="switch"
          bind:checked={$UserData.appdata.experiments[entry[0]]}
        />
      </div>
    </div>
  {/each}
{/if}
