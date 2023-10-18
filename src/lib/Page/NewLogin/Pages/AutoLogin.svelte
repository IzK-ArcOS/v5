<script lang="ts">
  import { onMount } from "svelte";
  import type { Login } from "../../../../ts/newlogin/main";
  import Loading from "../Loading.svelte";

  export let runtime: Login;

  onMount(() => {
    console.log(runtime);
  });
</script>

<Loading {runtime} />
