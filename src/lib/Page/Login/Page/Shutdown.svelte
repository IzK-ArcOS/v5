<script lang="ts">
  import "../../../../css/login/userlogin.css";
  import { onMount } from "svelte";
  import { applyState } from "../../../../ts/state/main";
  import flush from "../../../../ts/login/flush";
  import Loading from "./Content/Loading.svelte";

  onMount(() => {
    setTimeout(() => {
      flush();

      applyState("turnedoff");
    }, 2000);
  });
</script>

<Loading caption="Shutting down" />
