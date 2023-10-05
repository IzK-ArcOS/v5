<script lang="ts">
  import { PersonalizationIcon } from "../../../../../../ts/icon/general";
  import { UserData } from "../../../../../../ts/userlogic/interfaces";
  import { hideOverlay } from "../../../../../../ts/window/overlay";

  let hex = "70D6FF";

  function cancel() {
    hideOverlay("customAccentColor", "SettingsApp");
  }

  function apply() {
    $UserData.sh.desktop.accent = hex;
    cancel();
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
      <div class="color" style="background-color:#{hex};" />
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
  }

  div.wrapper img {
    height: 40px;
  }

  div.wrapper div.right {
    width: 100%;
  }

  div.wrapper div.hex-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
    border: var(--win-border);
    padding: 5px 10px;
    border-radius: 5px;
  }

  div.wrapper div.hex-wrapper input {
    border: none;
    box-shadow: none !important;
    font-family: "Source Code Pro", monospace;
    flex-grow: 1;
    height: 25px;
  }
  div.wrapper div.hex-wrapper div.color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  div.wrapper div.hex-wrapper :first-child {
    opacity: 0.5;
    margin-left: 5px;
  }
</style>
