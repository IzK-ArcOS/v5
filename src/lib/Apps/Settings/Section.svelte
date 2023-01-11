<script lang="ts">
  import { currentCollapsibleT } from "../../../ts/applogic/apps/SettingsApp/main";

  export let collapsible = false;
  export let header: string;
  export let collapsed = true;

  currentCollapsibleT.subscribe((v) => {
    if (!v || !collapsible) return;

    collapsed = header != v;
  });

  function collapse() {
    collapsed = !collapsed;

    if (!collapsed) currentCollapsibleT.set(header);
  }
</script>

<section class:collapsible class:collapsed>
  <h3 class="header" on:click={collapse}>{header}</h3>
  <slot />
</section>
