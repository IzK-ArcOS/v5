<script lang="ts">
  import { UserData } from "../../../../../../ts/userlogic/interfaces";

  export let color: string;

  function change() {
    $UserData.sh.desktop.accent = color;
  }
</script>

<button
  class="color ol"
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
    outline: transparent solid 3px;
    outline-offset: 2px;
    vertical-align: middle;
    transform: scale(0.85);
  }

  button.color.selected {
    outline: var(--fg) solid 3px !important;
    transform: unset;
  }
</style>
