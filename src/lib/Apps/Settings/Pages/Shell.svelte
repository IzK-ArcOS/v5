<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import Asterisk from "../../SettingsApp/Asterisk.svelte";
  import OptionSection from "../OptionSection.svelte";
  import TaskBarPosition from "./Shell/TaskBarPosition.svelte";
</script>

<h1 class="page-title">Shell</h1>
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
<OptionSection
  title="Center taskbar buttons"
  context="Centers the taskbar app buttons"
  asterisk
>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.taskbar.centered}
    disabled={$UserData.sh.taskbar.isLauncher}
  />
</OptionSection>
<OptionSection
  title="Taskbar app labels"
  context="Display app names on the taskbar"
  asterisk
>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.taskbar.labels}
    disabled={$UserData.sh.taskbar.pos.includes("vertical") ||
      $UserData.sh.taskbar.isLauncher}
  />
</OptionSection>
<OptionSection
  title="Taskbar position"
  context="Where do you want the taskbar?"
  asterisk
>
  <TaskBarPosition disabled={$UserData.sh.taskbar.isLauncher} />
</OptionSection>
<hr />
<OptionSection
  title="Small start menu"
  context="Make the start menu smaller"
  asterisk
>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.start.small}
    disabled={$UserData.sh.taskbar.isLauncher}
  />
</OptionSection>
<Asterisk>These settings require Launcher Mode to be turned off.</Asterisk>

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
