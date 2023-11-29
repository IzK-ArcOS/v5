<script lang="ts">
  export let store: Writable<string>;
  export let name: string;
</script>

<div class="window-page" class:show={$store == name}>
  {#if $store == name}
    <slot />
  {/if}
</div>

<style>
  .window-page {
    display: none;
    width: 100%;
    height: 100%;
    background-color: inherit;
  }

  .window-page.show {
    display: block;
  }
</style>
