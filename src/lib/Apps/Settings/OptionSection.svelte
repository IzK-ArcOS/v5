<script lang="ts">
  export let title: string;
  export let context: string;
  export let asterisk = false;
</script>

<div class="section opt">
  <div>
    <h3 class="header" class:asterisk>{title}</h3>
    <p class="context">{context}</p>
  </div>
  <div class="opt-sel">
    <slot />
  </div>
</div>

<style>
  .asterisk {
    display: flex;
    align-items: top;
    gap: 5px;
  }

  .asterisk::after {
    content: "*";
    color: var(--clr-red-fg);
    font-family: "Source Code Pro", monospace;
    font-weight: bold;
    font-size: 12px;
  }
</style>
