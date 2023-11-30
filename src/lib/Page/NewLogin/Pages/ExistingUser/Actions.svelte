<script lang="ts">
  import type { Login } from "../../../../../ts/newlogin/main";
  import sleep from "../../../../../ts/sleep";

  export let runtime: Login;

  async function register() {
    runtime.setUser(null);

    await sleep(0);

    runtime.navigate("newuserauth");
  }

  async function switchUser() {
    runtime.setUser(null);

    await sleep(0);

    runtime.navigate("selector");
  }
</script>

<button class="normal switchuser" on:click={switchUser}>Show Picker</button>
<button class="normal link createaccount" on:click={register}>
  I have no account
</button>
