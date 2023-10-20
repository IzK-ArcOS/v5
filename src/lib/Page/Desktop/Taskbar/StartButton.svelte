<script lang="ts">
  import { Logo } from "../../../../ts/branding";
  import { startOpened } from "../../../../ts/desktop/main";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import AccentedLogo from "../AccentedLogo.svelte";

  function toggle() {
    $startOpened = !$startOpened;
  }
</script>

<button class="start" class:open={$startOpened} on:click={toggle}>
  {#if $UserData.sh.taskbar.accentedStart}
    <AccentedLogo width={30} height={30} />
  {:else}
    <img src={Logo()} alt="ArcOS Logo" />
  {/if}
</button>
