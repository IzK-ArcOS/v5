<script lang="ts">
  export let collapsible = false;
  export let header: string;
  export let collapsed = true;

  function collapse() {
    collapsed = !collapsed;
  }
</script>

<section class:collapsible class:collapsed>
  <h3 class="header" on:click={collapse}>{header}</h3>
  <slot />
</section>
