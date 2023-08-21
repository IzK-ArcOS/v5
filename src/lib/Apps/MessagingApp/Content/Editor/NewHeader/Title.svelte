<script lang="ts">
  export let title: string;
</script>

<div class="opt title">
  <p class="caption">Title</p>
  <div>
    <input
      type="text"
      autocomplete="new-password"
      placeholder="Something very important..."
      bind:value={title}
    />
  </div>
</div>
