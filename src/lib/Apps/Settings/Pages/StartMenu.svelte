<script lang="ts">
  import { UserData } from "$$ts/userlogic/interfaces";
  import Section from "../Section.svelte";
</script>

<h1>Start Menu</h1>
<Section header="Small Start">
  <p class="context">Here you can choose to make the start menu smaller</p>
  <input
    type="checkbox"
    id="a"
    class="switch"
    bind:checked={$UserData.sh.start.small}
  />
  <label for="a">Small start menu</label>
</Section>
