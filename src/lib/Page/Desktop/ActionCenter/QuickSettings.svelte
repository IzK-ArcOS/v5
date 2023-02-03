<script lang="ts">
  import { QuickSettings } from "$$ts/desktop/actioncenter/quicksettings/store";
  import Setting from "./QuickSettings/Setting.svelte";
</script>

<div class="quicksettings">
  {#each QuickSettings as setting}
    <Setting {setting} />
  {/each}
</div>
