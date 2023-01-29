<script lang="ts">
  import type { PartialUserDir, UserFile } from "../../../ts/api/interface";
  import Dir from "./ListView/Dir.svelte";
  import File from "./ListView/File.svelte";

  export let files: UserFile[] = [];
  export let dirs: PartialUserDir[] = [];
</script>

<div class="listview">
  {#each dirs as dir}
    <Dir {dir} />
  {/each}
  {#each files as file}
    <File {file} />
  {/each}
</div>
