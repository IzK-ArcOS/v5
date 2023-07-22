<script lang="ts">
  import { UserData } from "../../../../../../ts/userlogic/interfaces";

  export let color: string;

  function change() {
    $UserData.sh.desktop.accent = color;
  }
</script>

<button
  class="color ol reset"
  style="background: #{color};"
  class:selected={color == $UserData.sh.desktop.accent}
  on:click={change}
  data-caller="appearance-accentselector"
  data-hex={color}
  title="#{color.toUpperCase()}"
/>

<style scoped>
  button.color {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    padding: 0px !important;
    margin: 0 5px !important;
    outline: transparent solid 5px;
    outline-offset: 4px;
    vertical-align: middle;
    transform: unset;
    margin-bottom: 10px !important;
    border: none;
  }

  button.color.selected {
    outline: var(--fg) solid 5px !important;

    transform: scale(0.8);
  }
</style>
