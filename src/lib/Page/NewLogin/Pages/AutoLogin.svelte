<script lang="ts">
  import { onMount } from "svelte";
  import type { Login } from "../../../../ts/newlogin/main";
  import Loading from "../Loading.svelte";

  export let runtime: Login;
  export let key = "";

  const CAPTIONS = {
    logoff: "Goodbye!",
    restart: "Restarting",
    shutdown: "Shutting down",
    autologin: "Welcome",
  };

  onMount(() => {
    console.log(runtime);
  });
</script>

<Loading {runtime} caption={CAPTIONS[key || "autologin"]} />
