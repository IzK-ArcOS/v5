<script lang="ts">
  import { UserData } from "../../../ts/userlogic/interfaces";

  let userdata: UserData;

  UserData.subscribe((v) => {
    userdata = v;
  });
</script>

{#if userdata}
  <div class="taskbar" class:docked={userdata.sh.taskbar.docked}>
    <slot />
  </div>
{/if}
