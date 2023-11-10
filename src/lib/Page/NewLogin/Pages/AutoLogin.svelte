<script lang="ts">
  import { onMount } from "svelte";
  import type { Login } from "../../../../ts/newlogin/main";
  import Loading from "../Loading.svelte";
  import { get, writable } from "svelte/store";
  import Spinner from "../../../Spinner.svelte";
  import { ARCOS_MODE } from "../../../../ts/branding";
  import { CurrentLogItem } from "../../../../ts/console";

  export let runtime: Login;
  export let key = "";

  let full = false;
  let caption = writable("");

  const CAPTIONS = {
    logoff: "Goodbye!",
    restart: "Restarting",
    shutdown: "Shutting down",
    autologin: "Welcome",
  };

  CurrentLogItem.subscribe((v) => {
    $caption =
      ARCOS_MODE == "development" ? v.msg : CAPTIONS[key || "autologin"];
  });

  onMount(() => {
    const username = get(runtime.UserName);

    full = !username || username == "ArcOS";
  });
</script>

{#if !full}
  <Loading {runtime} caption={$caption} />
{:else}
  <div class="login-full">
    <Spinner height={30} />
    <span>{$caption}</span>
  </div>
{/if}
