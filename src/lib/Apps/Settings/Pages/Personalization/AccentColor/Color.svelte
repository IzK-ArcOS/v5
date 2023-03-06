<script lang="ts">
  import { UserData } from "../../../../../../ts/userlogic/interfaces";

  export let color: string;

  function change() {
    $UserData.sh.desktop.accent = color;
  }
</script>

<button
  class="color"
  style="background: #{color};"
  class:selected={color == $UserData.sh.desktop.accent}
  on:click={change}
/>

<style scoped>
  button.color {
    width: 25px;
    height: 25px;
    border-radius: 50% !important;
    padding: 0px !important;
    margin: 0 5px !important;
    border: #0000 1px solid;
    vertical-align: middle;
    box-shadow: 0 0 0 3px transparent;
  }

  button.color.selected {
    border: var(--win-bg) 2px solid;
    box-shadow: 0 0 0 3px var(--fg);
  }
</style>
