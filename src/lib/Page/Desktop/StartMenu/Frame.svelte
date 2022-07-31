<script lang="ts">
  import { startOpened } from "../../../../ts/desktop/main";

  function closeStart() {
    $startOpened = false;
  }
</script>

<div
  class="startframe fullscreen"
  class:present={$startOpened}
  on:click={closeStart}
/>
