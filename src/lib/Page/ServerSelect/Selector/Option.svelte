<script lang="ts">
  import icon from "../../../../assets/fts/connect.svg";
  import type { ServerSelectOption } from "../../../../ts/api/interface";

  export let server: ServerSelectOption;
  export let selected: string;

  function select() {
    selected = server.hostname;
  }
</script>

<button
  class="option"
  on:click={select}
  class:selected={selected == server.hostname}
>
  <img src={icon} alt="" class="icon" />
  <p class="caption">{server.hostname}</p>
  {#if server.private}
    <span class="material-icons-round">lock</span>
  {/if}
</button>
