<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import OptionSection from "../OptionSection.svelte";
</script>

<h1>Shell</h1>
<OptionSection
  title="Center taskbar buttons"
  context="Centers the taskbar app buttons"
>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.taskbar.centered}
  />
</OptionSection>
<OptionSection
  title="Taskbar app labels"
  context="Display app names on the taskbar"
>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.taskbar.labels}
  />
</OptionSection>
<OptionSection
  title="Taskbar position"
  context="Where do you want the taskbar?"
>
  <select bind:value={$UserData.sh.taskbar.pos}>
    <option value="vertical">Left</option>
    <option value="">Bottom</option>
    <option value="vertical-right">Right</option>
  </select>
</OptionSection>
<hr />
<OptionSection title="Small start menu" context="Make the start menu smaller">
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.start.small}
  />
</OptionSection>
<hr />
<OptionSection
  title="Hide quick settings"
  context="Hide quick settings in the action center"
>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.noQuickSettings}
  />
</OptionSection>
<OptionSection title="Dock shell" context="Dock the taskbar and action center">
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.taskbar.docked}
  />
</OptionSection>
<OptionSection
  title="Colored shell"
  context="Apply the accent color to the shell"
>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.taskbar.colored}
  />
</OptionSection>
