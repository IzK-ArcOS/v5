<script lang="ts">
  import type { SettingsPage } from "../../../../../ts/applogic/apps/SettingsApp/interface";

  export let page: SettingsPage;
</script>

<button class="link settings">
  <div class="image"><img src={page.icon} alt={page.name} /></div>
  <div class="caption">{page.name}</div>
</button>
