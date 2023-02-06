<script>
  import { MessagingPages } from "../../../ts/messaging/paging/store";
</script>

<div class="sidebar">
  {#each Object.entries(MessagingPages) as page}
    <p>{page[1].name}</p>
  {/each}
</div>
