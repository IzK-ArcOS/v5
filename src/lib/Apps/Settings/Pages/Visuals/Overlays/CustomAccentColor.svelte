<script lang="ts">
  import { PersonalizationIcon } from "../../../../../../ts/icon/general";
  import { UserData } from "../../../../../../ts/userlogic/interfaces";
  import { hideOverlay } from "../../../../../../ts/window/overlay";
  import "../../../../../../css/desktop/apps/settings/visuals/customaccent.css";

  let hex = "70D6FF";
  let picker: HTMLInputElement;

  function cancel() {
    hideOverlay("customAccentColor", "SettingsApp");
  }

  function apply() {
    $UserData.sh.desktop.accent = hex;
    cancel();
  }

  function openPicker() {
    picker.click();
  }

  UserData.subscribe((v) => {
    if (v.sh.desktop.accent !== hex) hex = v.sh.desktop.accent;
  });

  function pickerInput() {
    hex = picker.value.replace("#", "").toUpperCase();
  }
</script>

<div class="wrapper">
  <div class="top">
    <div class="left">
      <img src={PersonalizationIcon} alt="" />
    </div>
    <div class="right">
      <p>Enter a custom accent color:</p>
      <div class="hex-wrapper">
        <span>#</span>
        <input
          type="text"
          class="field"
          maxlength="6"
          minlength="3"
          bind:value={hex}
        />
        <button
          class="color"
          style="background-color:#{hex};"
          on:click={openPicker}
        />
        <input
          type="color"
          bind:this={picker}
          class="picker"
          on:input={pickerInput}
          value="#{hex}"
        />
      </div>
    </div>
  </div>
  <div class="buttons">
    <div class="inner">
      <button on:click={cancel}>Cancel</button>
      <button class="suggested" on:click={apply} disabled={hex.length !== 6}
        >Apply</button
      >
    </div>
  </div>
</div>
