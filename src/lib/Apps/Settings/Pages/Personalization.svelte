<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import OptionSection from "../OptionSection.svelte";
  import Section from "../Section.svelte";
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
<OptionSection
  title="Transparency"
  context="Hide transparency effects in ArcOS"
>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.noGlass}
  />
</OptionSection>
<OptionSection title="Theme" context="Change the coloring of the UI">
  <select name="aa" id="bb">
    <option>Darkmode</option>
    <option>Lightmode</option>
  </select>
</OptionSection>
