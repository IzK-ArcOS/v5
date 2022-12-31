<script lang="ts">
  import { NotificationStore } from "../../../../ts/notiflogic/main";
</script>

<div class="notifications">
  {#each Object.entries($NotificationStore) as notification}{/each}
</div>
