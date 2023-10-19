<script lang="ts">
  export let errored: boolean;
</script>

<p class="incorrect">The password is incorrect. Try again.</p>
<button class="normal switchuser" on:click={() => (errored = false)}>
  Okay
</button>
