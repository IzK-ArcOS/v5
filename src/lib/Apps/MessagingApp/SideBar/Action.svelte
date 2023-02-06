<script lang="ts">
  import type { MessageAppAction } from "../../../../ts/messaging/actions/interface";

  export let action: MessageAppAction;
</script>

<button
  class="material-icons-round"
  title={action.name}
  on:click={action.action}
>
  {action.icon}
</button>
