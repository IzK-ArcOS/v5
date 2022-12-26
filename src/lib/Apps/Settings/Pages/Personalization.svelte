<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import Section from "../Section.svelte";
</script>

<h1>Personalization</h1>
<Section header="Animations">
  <p class="context">
    Turning off animations can improve performance on slower<br />
    devices.
  </p>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.anim}
  />
  <label for="a">Enable animations</label>
</Section>
<Section header="Transparency">
  <p class="context">
    Enabling this setting will give the shell and certain windows a<br />
    glass appearance.
  </p>
  <input
    type="checkbox"
    id="b"
    class="switch"
    bind:checked={$UserData.sh.noGlass}
  />
  <label for="b">Disable transparency for all applications</label>
</Section>
