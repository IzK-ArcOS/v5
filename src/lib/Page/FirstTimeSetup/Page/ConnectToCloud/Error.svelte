<script lang="ts">
  export let connectionError: boolean;
</script>

{#if connectionError}
  <p class="fullwidth centered connect-error">
    <span class="material-icons-round">error</span>Connection to ArcAPI failed!
  </p>
{/if}
