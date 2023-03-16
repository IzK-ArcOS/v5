<script lang="ts">
  import { onMount } from "svelte";
  import "../../../../css/login/userlogin.css";
  import flush from "../../../../ts/login/flush";
  import { applyLoginState } from "../../../../ts/login/main";
  import { UserName } from "../../../../ts/userlogic/interfaces";
  import Loading from "./Content/Loading.svelte";

  onMount(() => {
    setTimeout(() => {
      flush();

      applyLoginState("selector");
    }, 2000);
  });
</script>

<Loading caption="Goodbye" username={$UserName} />
