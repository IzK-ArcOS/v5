<script lang="ts">
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import Section from "../Section.svelte";
</script>

<h1>Windows</h1>
<Section header="Large titlebar">
  <p class="context">
    Here you can choose to make the window titlebars bigger for a<br />
    better appearance.
  </p>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.window.bigtb}
  />
  <label for="a">Large titlebars</label>
</Section>
<Section header="Left titlebar buttons">
  <p class="context">Swap the title and window controls</p>
  <input
    type="checkbox"
    id="b"
    class="switch"
    bind:checked={$UserData.sh.window.lefttb}
  />
  <label for="b">Swapped titlebar</label>
</Section>
