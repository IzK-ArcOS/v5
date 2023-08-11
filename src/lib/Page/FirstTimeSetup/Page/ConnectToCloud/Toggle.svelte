<script lang="ts">
  export let foreign = false;
  export let connectionError = false;

  const toggleForeign = () => {
    foreign = !foreign;
    connectionError = false;
  };
</script>

<button class="centered flat" on:click={toggleForeign}>
  {foreign ? "Use Community API" : "Use custom API"}
</button>
