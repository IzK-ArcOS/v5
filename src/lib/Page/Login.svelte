<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/login.css";
  import { loginOnMount } from "../../ts/login/main";
  import Background from "./Login/Background.svelte";
  import Center from "./Login/Center.svelte";
  import Darken from "./Login/Darken.svelte";
  import Topbar from "./Login/Topbar.svelte";

  let show = false;

  onMount(async () => {
    show = false;
    await loginOnMount();
    show = true;
  });
</script>

<div class="login fullscreen" class:show>
  <Background />
  <Darken />
  <Topbar />
  <Center />
</div>
