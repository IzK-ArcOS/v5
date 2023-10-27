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

  UserData.subscribe((v) => {
    active = setting.getter(v);
  });
</script>

<button class="setting" class:active on:click={click}>
  <span class="material-icons-round">
    {active ? setting.icon : setting.iconOff}
  </span>
  <p class="caption">{setting.caption}</p>
</button>
