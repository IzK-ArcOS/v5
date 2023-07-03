<script lang="ts">
  import { AppStore } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import OptionSection from "../OptionSection.svelte";
</script>

<h1>Shell</h1>
<OptionSection
  title="Launcher Mode"
  context="Use a GNOME-style launcher instead of the taskbar"
>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.taskbar.isLauncher}
  />
</OptionSection>
{#if !$UserData.sh.taskbar.isLauncher}
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
      disabled={!!$UserData.sh.taskbar.pos}
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
{/if}
<hr />
<OptionSection title="Small start menu" context="Make the start menu smaller">
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.start.small}
  />
</OptionSection>
<OptionSection
  title="Show hidden apps"
  context="Display hidden apps in the start menu"
>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.showHiddenApps}
    on:click={() => ($AppStore = $AppStore)}
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
<hr />
<OptionSection
  title="Compact context menu"
  context="Make the context menu more compact"
>
  <input
    type="checkbox"
    class="switch"
    bind:checked={$UserData.sh.compactContext}
  />
</OptionSection>
