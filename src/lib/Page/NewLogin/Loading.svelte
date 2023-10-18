<script lang="ts">
  import type { Login } from "../../../ts/newlogin/main";
  import Spinner from "../../Spinner.svelte";
  import UserHeader from "./UserHeader.svelte";
  import WelcomeSpinner from "./WelcomeSpinner.svelte";

  export let runtime: Login;
</script>

<div class="login-loading">
  <UserHeader {runtime} />
  <WelcomeSpinner />
</div>
