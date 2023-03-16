<script lang="ts">
  import { applyLoginState } from "../../../../../ts/login/main";

  export let show: boolean;
</script>

<button
  class="switchuser"
  class:show
  on:click={() => applyLoginState("selector")}>Cancel</button
>
