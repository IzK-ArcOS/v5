<script lang="ts">
  import ProfilePicture from "../../../../ProfilePicture.svelte";
  import pfp from "../../../../../assets/pfp/null.png";
  import { apiCall, ConnectedServer } from "../../../../../ts/api/main";
  import { loginUsingCreds } from "../../../../../ts/api/getter";
  import { generateCredToken } from "../../../../../ts/api/cred";
  import { UserData, UserName } from "../../../../../ts/userlogic/interfaces";
  import { applyState } from "../../../../../ts/state/main";
  import { loginUsername } from "../../../../../ts/login/main";
  import { Busy } from "../../../../../ts/env/main";

  export let loading: boolean;
  export let username: string;
  export let password: string;
  let confirm: string;

  export let errored = false;

  async function createAccount(e?: Event) {
    if (e) e.preventDefault();

    if (password != confirm) return false;

    if (!username || !password || loading) return false;

    loginUsername.set(username);

    Busy.set(false);
    loading = true;

    await apiCall($ConnectedServer, "user/create", {}, null, {
      username,
      password,
    });

    const userdata = await loginUsingCreds(
      generateCredToken({ username, password })
    );

    if (!userdata) {
      Busy.set(false);

      errored = true;

      return (loading = false);
    }

    UserData.set(userdata);
    UserName.set(username);

    applyState("desktop");

    return false;
  }
</script>

<ProfilePicture src={pfp} height={151} />
<h1>New user</h1>
<form on:submit={createAccount}>
  <input
    type="text"
    placeholder="Username"
    class="block"
    disabled={loading}
    bind:value={username}
  />
</form>
<input
  type="password"
  placeholder="Password"
  class="block"
  disabled={loading || !username}
  bind:value={password}
/>
<div class="input-wrapper">
  <form on:submit={createAccount}>
    <input
      type="password"
      placeholder="Confirm Password"
      class="block"
      disabled={loading || !username}
      bind:value={confirm}
    />
  </form>
  <button
    on:click={createAccount}
    disabled={loading || !username || !password || password != confirm}
    class="createbutton material-icons-round"
  >
    arrow_forward_ios
  </button>
</div>
