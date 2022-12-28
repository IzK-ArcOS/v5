<script lang="ts">
  import { CurrentLoginState } from "../../../ts/login/main";

  //export let show: boolean = false;
</script>

{#if $CurrentLoginState}
  <div
    class="fullscreen darken"
    class:show={$CurrentLoginState.attribs.darken}
  />
{/if}
