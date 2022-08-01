<script lang="ts">
  import { ErrorMessages } from "../../../ts/errorlogic/app";
  import Renderer from "./ErrorDialogStore/Renderer.svelte";
</script>

<div class="winstore">
  {#each $ErrorMessages as err}
    <Renderer {err} />
  {/each}
</div>
