<script lang="ts">
  import { fbState } from "../../../ts/applogic/apps/FileBrowser/main";
  import { UserName } from "../../../ts/userlogic/interfaces";
</script>

{#if $fbState.dirContents}
  <div class="bottom">
    {#if !$fbState.home}
      <div class="section">
        {$fbState.currentDir || "./"}
      </div>
      <div class="section">
        {$fbState.dirContents.name}
      </div>

      <div class="right">
        <div class="section">
          {$fbState.dirContents.files.length} Files
        </div>
        <div class="section">
          {$fbState.dirContents.directories.length} Folders
        </div>
      </div>
    {:else}
      <div class="section">Home</div>
      <div class="right">
        <div class="section">{$UserName}</div>
      </div>
    {/if}
  </div>
{/if}
