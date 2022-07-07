<script lang="ts">
  import { CurrentLoginState } from "../../../ts/login/main";
</script>

{#if $CurrentLoginState}
  <div class="background fullscreen" class:zoom={$CurrentLoginState.attribs.darken} />
{/if}
