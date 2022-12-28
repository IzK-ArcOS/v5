<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import Section from "../Section.svelte";
</script>

<h1>Taskbar</h1>
<Section header="Centered buttons">
  <p class="context">Put all app buttons in the center of the taskbar</p>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.taskbar.centered}
  />
  <label for="a">Center app buttons</label>
</Section>
<Section header="App Labels">
  <p class="context">Display application names beside their icons</p>
  <input
    type="checkbox"
    id="b"
    class="switch"
    bind:checked={$UserData.sh.taskbar.labels}
  />
  <label for="b">Show labels</label>
</Section>
<Section header="Taskbar Docking">
  <p class="context">
    You can choose to make the taskbar float instead of being docked.
  </p>
  <input
    type="checkbox"
    id="c"
    class="switch"
    bind:checked={$UserData.sh.taskbar.docked}
  />
  <label for="c">Dock the taskbar</label>
</Section>
