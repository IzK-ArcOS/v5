<script lang="ts">
  import { restart, shutdown } from "../../../../../../ts/desktop/power";
  import {
    LogoutIcon,
    RestartIcon,
    ShutdownIcon,
  } from "../../../../../../ts/icon/power";
</script>

<button class="icon" on:click={shutdown}>
  <img src={ShutdownIcon} alt="" />
</button>
<button class="icon" on:click={() => restart(true)}>
  <img src={LogoutIcon} alt="" />
</button>
<button class="icon" on:click={() => restart(false)}>
  <img src={RestartIcon} alt="" />
</button>
