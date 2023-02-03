<script lang="ts">
  import { onMount } from "svelte";
  import type { QuickSetting } from "../../../../../ts/desktop/actioncenter/quicksettings/interface";
  import { UserData } from "../../../../../ts/userlogic/interfaces";

  let active = false;

  export let setting: QuickSetting;
  function click() {
    setting.setter($UserData);

    active = setting.getter($UserData);
  }

  onMount(() => {
    active = setting.getter($UserData);
  });
</script>

<button class="setting material-icons-round" class:active on:click={click}>
  {active ? setting.icon : setting.iconOff}
  <p class="caption">{setting.caption}</p>
</button>
