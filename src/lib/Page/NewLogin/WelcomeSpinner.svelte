<script lang="ts">
  import Spinner from "../../Spinner.svelte";

  export let caption = "Welcome";
</script>

<h3 class="welcome-spinner">
  <Spinner height={23} /><span>{caption}</span>
</h3>
