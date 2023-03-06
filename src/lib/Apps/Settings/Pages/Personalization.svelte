<script lang="ts">
  import { accentColors } from "../../../../ts/desktop/accent";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import OptionSection from "../OptionSection.svelte";
  import Section from "../Section.svelte";
  import AccentColor from "./Personalization/AccentColor.svelte";
</script>

<h1>Visuals</h1>

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
<hr />
<OptionSection title="Style" context="Change the style of the UI">
  <select name="aa" id="bb" bind:value={$UserData.sh.desktop.theme}>
    <option value="dark">Darkmode</option>
    <option value="light">Lightmode</option>
    <option value="hc">High contrast</option>
  </select>
</OptionSection>

<AccentColor />
