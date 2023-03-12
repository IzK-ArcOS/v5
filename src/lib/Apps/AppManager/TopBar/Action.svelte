<script lang="ts">
  import type { AppManagerAction } from "../../../../ts/applogic/apps/AppManager/Manager";

  export let action: AppManagerAction;
</script>

<button class="action" on:click={action.action}>
  <span class="material-icons-round">{action.icon}</span>
  <p class="caption">{action.caption}</p>
</button>
