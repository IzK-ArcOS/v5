<script lang="ts">
  export let key: string;
  export let value: string | number | boolean | object;
</script>

<div class="nodeinstance">
  <div class="key">{key}</div>
  {#if typeof value != "object"}
    <div class="value" data-type={typeof value} data-value={value}>{value}</div>
  {/if}
</div>
