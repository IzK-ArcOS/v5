<script>
  import {
    ActionCenterOpened,
    toggleActionCenter,
  } from "../../../../../ts/desktop/actioncenter/main";
</script>

<button
  class="material-icons-round ac-open"
  on:click={toggleActionCenter}
  class:opened={$ActionCenterOpened}
>
  notifications
</button>
