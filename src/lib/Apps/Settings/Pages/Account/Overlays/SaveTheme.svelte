<script lang="ts">
  import "../../../../../../css/desktop/apps/settings/savetheme.css";
  import { saveCurrentTheme } from "../../../../../../ts/userlogic/themes/main";
  import { hideOverlay } from "../../../../../../ts/window/overlay";
  import Current from "../../Desktop/Current.svelte";

  let name: string;

  function closeThis() {
    hideOverlay("saveTheme", "SettingsApp");
  }

  function save() {
    saveCurrentTheme(name);
    closeThis();
  }
</script>

<div class="top">
  <div class="form">
    <h3 class="header">Save theme</h3>
    <p>Choose a name for your theme.</p>
    <input
      type="text"
      bind:value={name}
      placeholder="Example: Beautiful Sunset"
    />
  </div>
  <div class="desktop-page">
    <Current />
  </div>
</div>
<div class="actions">
  <div class="inner">
    <button on:click={closeThis}>Cancel</button>
    <button disabled={!name} on:click={save} class:suggested={name}>Save</button
    >
  </div>
</div>
