<script lang="ts">
  import type { Login } from "../../../../../ts/newlogin/main";

  export let runtime: Login;

  function register() {
    runtime.navigate("newuserauth");
  }

  function switchUser() {
    runtime.navigate("selector");
  }
</script>

<button class="normal switchuser" on:click={switchUser}>Switch User</button>
<button class="normal link createaccount" on:click={register}>
  I have no account
</button>
