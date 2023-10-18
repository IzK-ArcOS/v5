<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/newlogin.css";
  import { loginOnMount } from "../../ts/login/main";
  import Background from "./Login/Background.svelte";
  import Darken from "./Login/Darken.svelte";
  import Topbar from "./Login/Topbar.svelte";

  let show = false;

  onMount(async () => {
    show = true;
    await loginOnMount();
    show = true;
  });
</script>

<div class="login fullscreen" class:show>
  <Background />
  <Darken />
  <Topbar />
</div>
