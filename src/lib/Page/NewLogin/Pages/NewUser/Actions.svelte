<script lang="ts">
  import type { Login } from "../../../../../ts/newlogin/main";

  export let runtime: Login;

  function existing() {
    runtime.navigate("selector");
  }
</script>

<button class="normal link createaccount" on:click={existing}>
  I have an account
</button>
