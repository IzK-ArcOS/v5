<script lang="ts">
  import { fbState } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { HomeIcon } from "../../../../ts/icon/general";
</script>

<div class="home">
  <button
    class="folder"
    class:selected={$fbState.home}
    on:click={() => ($fbState.home = true)}
  >
    <img src={HomeIcon} alt="" />
    <p class="name">Home</p>
  </button>
</div>
