<script lang="ts">
  import { onMount } from "svelte";
  import { PersonalizationIcon } from "../../../../../../ts/icon/general";
  import { UserData } from "../../../../../../ts/userlogic/interfaces";
  import { hideOverlay } from "../../../../../../ts/window/overlay";

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
    <div class="buttons">
      <button on:click={cancel}>Cancel</button>
      <button class="suggested" on:click={apply} disabled={hex.length !== 6}
        >Apply</button
      >
    </div>
  </div>
</div>

<style scoped>
  div.wrapper {
    display: flex;
    align-items: start;
    gap: 10px;
    width: 100%;
    height: 100%;
  }

  div.wrapper img {
    height: 40px;
  }

  div.wrapper div.right {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  div.wrapper div.right p {
    margin: 0;
  }

  div.wrapper div.right div.buttons {
    margin-top: auto;
    display: flex;
    gap: 10px;
    justify-content: end;
  }

  div.wrapper div.hex-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
    border: var(--win-border);
    padding: 5px 10px;
    border-radius: 5px;
    padding-right: 20px;
  }

  div.wrapper div.hex-wrapper input {
    border: none;
    box-shadow: none !important;
    font-family: "Source Code Pro", monospace;
    flex-grow: 1;
    height: 25px;
  }

  div.wrapper div.hex-wrapper input.picker {
    border: none;
    width: 0px;
    height: 0px;
    padding: 0;
    min-width: unset !important;
    flex-grow: 0;
    margin-left: -20px;
  }

  div.wrapper div.hex-wrapper input::-webkit-color-swatch {
    display: none;
  }

  div.wrapper div.hex-wrapper button.color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    min-width: unset;
    aspect-ratio: 1/1;
    padding: 0;
  }

  div.wrapper div.hex-wrapper :first-child {
    opacity: 0.5;
    margin-left: 5px;
  }
</style>
