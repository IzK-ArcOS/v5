<script lang="ts">
  import { CurrentLoginState } from "$$ts/login/main";
</script>

{#if $CurrentLoginState}
  <div class="center-absolute">
    <svelte:component this={$CurrentLoginState.content} />
  </div>
{/if}
