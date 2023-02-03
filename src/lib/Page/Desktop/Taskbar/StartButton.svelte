<script lang="ts">
  import arcos from "@assets/systemIcon.svg";
  import { startOpened } from "../../../../ts/desktop/main";

  function toggle() {
    $startOpened = !$startOpened;
  }
</script>

<button class="start" class:open={$startOpened} on:click={toggle}>
  <img src={arcos} alt="ArcOS Logo" />
</button>
