<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { showOverlay } from "../../../../ts/window/overlay";
  import OptionSection from "../OptionSection.svelte";
</script>

<h1 class="page-title">Windows</h1>
<OptionSection title="Large titlebar" context="Make the titlebars larger">
  <input
    type="checkbox"
    class="switch"
    bind:checked={$UserData.sh.window.bigtb}
  />
</OptionSection>
<OptionSection
  title="Left titlebar buttons"
  context="Swap the title and window controls"
>
  <input
    type="checkbox"
    class="switch"
    bind:checked={$UserData.sh.window.lefttb}
  />
</OptionSection>
<OptionSection
  title="Center window title"
  context="Put the window title in the center of the titlebar."
>
  <input
    type="checkbox"
    class="switch"
    bind:checked={$UserData.sh.window.centertb}
  />
</OptionSection>
<OptionSection title="Titlebar Buttons" context="Change the titlebar controls">
  <button on:click={() => showOverlay("changeTitleButtons", "SettingsApp")}
    >Change...</button
  >
</OptionSection>
