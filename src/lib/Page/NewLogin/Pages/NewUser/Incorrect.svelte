<script lang="ts">
  export let errored: boolean;
</script>

<p class="incorrect">The user already exists.</p>
<button class="normal switchuser" on:click={() => (errored = false)}>
  Okay
</button>
