<script lang="ts">
  import { FileBrowserHome } from "../../../../ts/applogic/apps/FileBrowser/main";
  import { HomeIcon } from "../../../../ts/icon/main";
</script>

<div class="home">
  <button
    class="folder"
    class:selected={$FileBrowserHome}
    on:click={() => ($FileBrowserHome = true)}
  >
    <img src={HomeIcon} alt="" />
    <p class="name">Home</p>
  </button>
</div>
