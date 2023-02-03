<script lang="ts">
  import { onMount } from "svelte";
  import "@css/devbar.css";
  import { log, LogLevel } from "$$ts/console";
  import { DevModeOverride, updateDevModeProps } from "$$ts/devmode/props";
  import { dmProps } from "$$ts/devmode/store/props";

  export let opened = false;

  let status = "";
  let statusTimeout;

  onMount(() => {
    updateDevModeProps();
  });

  log.subscribe(() => {
    clearTimeout(statusTimeout);
    const item = $log[$log.length - 1];

    status = `[${$log.length - 1} | ${item.timestamp}] [${LogLevel[
      item.level
    ].toUpperCase()}] ${item.source}: ${item.msg} `;

    statusTimeout = setTimeout(() => {
      status = "Ready.";
    }, 2000);
  });
</script>

{#if import.meta.env.DEV || $DevModeOverride}
  <div class="devbar" class:opened on:click={() => (opened = !opened)}>
    <p class="title">
      <b>ArcOS Development Environment</b> | {import.meta.env.MODE} @ {location.hostname}
    </p>
    <div class="lastlog">{status}</div>
  </div>
  <div class="devmode-propertylist">
    <div class="props">
      {#each $dmProps as prop}
        <p class="prop" title="{prop[0]}: {prop[1]}">
          <span class="key">{prop[0]}</span>
          <span class="value">{prop[1]}</span>
        </p>
      {/each}
    </div>
  </div>
{/if}
