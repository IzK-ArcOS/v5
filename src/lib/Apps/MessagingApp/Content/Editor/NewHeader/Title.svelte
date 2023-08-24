<script lang="ts">
  export let title: string;

  function submit(e: SubmitEvent) {
    e.preventDefault();
  }
</script>

<div class="opt title">
  <p class="caption">Title</p>
  <form on:submit={submit} autocomplete="off">
    <input
      type="text"
      autocomplete="new-password"
      placeholder="Something very important..."
      bind:value={title}
    />
  </form>
</div>
