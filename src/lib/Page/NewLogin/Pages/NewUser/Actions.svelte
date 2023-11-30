<script lang="ts">
  import type { Login } from "../../../../../ts/newlogin/main";
  import sleep from "../../../../../ts/sleep";

  export let runtime: Login;

  async function existing() {
    runtime.setUser(null);

    await sleep(0);

    runtime.navigate("existinguserauth");
  }
</script>

<button class="normal link createaccount" on:click={existing}>
  I have an account
</button>
