<script lang="ts">
  import { currentCollapsibleT } from "../../../ts/applogic/apps/SettingsApp/main";

  export let collapsible = false;
  export let header: string;
  export let collapsed = false;
  export let opt = false;

  currentCollapsibleT.subscribe((v) => {
    if (!v || !collapsible) return;

    collapsed = header != v;
  });

  function collapse() {
    collapsed = !collapsed;

    if (!collapsed) currentCollapsibleT.set(header);
  }
</script>

<div class="section" class:collapsible class:collapsed class:opt>
  {#if collapsible}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="header" on:click={collapse}>{header}</div>
  {:else}
    <h3 class="header">{header}</h3>
  {/if}

  <div class="section-content"><slot /></div>
</div>
