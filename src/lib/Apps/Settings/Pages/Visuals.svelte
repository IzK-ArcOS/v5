<script lang="ts">
  import { createOverlayableError } from "../../../../ts/errorlogic/overlay";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import Asterisk from "../../SettingsApp/Asterisk.svelte";
  import OptionSection from "../OptionSection.svelte";
  import AccentColor from "./Personalization/AccentColor.svelte";

  function learnCursorScaling() {
    createOverlayableError(
      {
        title: "Cursor scaling",
        message:
          "The ArcOS cursor might not scale properly with your operating system. This is dependent on what OS you're running, but if your scale is above 100%, the cursor might appear smaller than the rest of the UI. ",
        buttons: [{ caption: "I see", action() {}, suggested: true }],
      },
      "SettingsApp"
    );
  }
</script>

<h1 class="page-title">Appearance</h1>
<OptionSection title="Style" context="Change the style of the UI">
  <select name="aa" id="bb" bind:value={$UserData.sh.desktop.theme}>
    <option value="dark">Darkmode</option>
    <option value="light">Lightmode</option>
    <option value="amoled">Amoled</option>
    <option value="amber">Amber Monochrome</option>
    <option value="scifi">Science Fiction</option>
    <option value="hc">High contrast</option>
  </select>
</OptionSection>
<hr />
<OptionSection title="Animations" context="Display animations in ArcOS">
  <input type="checkbox" class="switch" bind:checked={$UserData.sh.anim} />
</OptionSection>
<OptionSection title="No glass" context="Disable glass effects in ArcOS">
  <input type="checkbox" class="switch" bind:checked={$UserData.sh.noGlass} />
</OptionSection>
<OptionSection title="Sharp corners" context="Disable rounding in all of ArcOS">
  <input
    type="checkbox"
    class="switch"
    bind:checked={$UserData.sh.desktop.sharp}
  />
</OptionSection>
<OptionSection
  title="No Custom Cursors"
  context="Disable the ArcOS custom cursors"
  asterisk
>
  <input
    type="checkbox"
    class="switch"
    bind:checked={$UserData.sh.desktop.noCustomCursor}
  />
</OptionSection>
<Asterisk>
  Custom cursors might not always scale with the underlying Operating System.
  <button class="link" on:click={learnCursorScaling}>Learn more</button>
</Asterisk>
<hr />
<AccentColor />
