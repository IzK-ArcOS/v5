<script lang="ts">
  import { applyLoginState, loginUsername } from "../../../ts/login/main";
  import type { UserData } from "../../../ts/userlogic/interfaces";
  import pfp from "../../../assets/pfp/null.png";

  export let data: UserData;
  export let name: string;

  function go() {
    loginUsername.set(name);
    applyLoginState("todesktop");
  }
</script>

{#if data.acc.enabled}
  <button class="user" on:click={go}>
    <img alt="user" src={pfp} />
    <p class="username">{name}</p>
  </button>
{/if}
