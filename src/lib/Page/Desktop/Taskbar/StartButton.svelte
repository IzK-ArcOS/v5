<script lang="ts">
  import { Logo } from "../../../../ts/branding";
  import { startOpened } from "../../../../ts/desktop/main";

  function toggle() {
    $startOpened = !$startOpened;
  }
</script>

<button class="start" class:open={$startOpened} on:click={toggle}>
  <img src={Logo()} alt="ArcOS Logo" />
</button>
