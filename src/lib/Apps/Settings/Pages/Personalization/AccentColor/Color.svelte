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
  data-contextmenu="appearance-accentselector"
  data-hex={color}
  title="#{color.toUpperCase()}"
/>
