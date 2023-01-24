<script lang="ts">
  import {
    closeWindow,
    openChildWindow,
  } from "../../../../../ts/applogic/events";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import { showOverlay } from "../../../../../ts/window/overlay";
  import Current from "./Account/Current.svelte";

  function ch(i: number | null) {
    $UserData.acc.profilePicture = i;
    closeWindow("PfpSelector");
  }

  function change() {
    showOverlay("pfpSel", "SettingsApp");
  }
</script>

<Current />
<button on:click={change}>Change...</button>
