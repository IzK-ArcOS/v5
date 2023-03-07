<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { showOverlay } from "../../../../ts/window/overlay";
  import OptionSection from "../OptionSection.svelte";
  import Section from "../Section.svelte";
</script>

<h1>Windows</h1>
<OptionSection title="Large titlebar" context="Make the titlebars larger">
  <input
    type="checkbox"
    id="a"
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
    id="b"
    class="switch"
    bind:checked={$UserData.sh.window.lefttb}
  />
</OptionSection>
<OptionSection title="Titlebar Buttons" context="Change the titlebar controls">
  <button on:click={() => showOverlay("changeTitleButtons", "SettingsApp")}
    >Change...</button
  >
</OptionSection>
<hr />
<OptionSection title="Animations" context="Display animations in ArcOS">
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.anim}
  />
</OptionSection>
<OptionSection title="No glass" context="Disable glass effects in ArcOS">
  <input
    type="checkbox"
    id="b"
    class="switch"
    bind:checked={$UserData.sh.noGlass}
  />
</OptionSection>
<OptionSection title="Sharp corners" context="Disable rounding in all of ArcOS">
  <input
    type="checkbox"
    id="c"
    class="switch"
    bind:checked={$UserData.sh.desktop.sharp}
  />
</OptionSection>
