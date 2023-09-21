<script lang="ts">
  import homeIcon from "../../../../assets/apps/filemanager/home.svg";
  import { FileBrowserHome } from "../../../../ts/applogic/apps/FileBrowser/main";
</script>

<div class="home">
  <button
    class="folder"
    class:selected={$FileBrowserHome}
    on:click={() => ($FileBrowserHome = true)}
  >
    <img src={homeIcon} alt="" />
    <p class="name">Home</p>
  </button>
</div>
