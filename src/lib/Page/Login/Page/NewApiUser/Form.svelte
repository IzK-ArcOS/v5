<script lang="ts">
  import { Busy } from "../../../../../ts/env/main";
  import { loginUsername } from "../../../../../ts/login/main";
  import { applyState } from "../../../../../ts/state/main";
  import { UserData, UserName } from "../../../../../ts/userlogic/interfaces";
  import { createUser } from "../../../../../ts/userlogic/mutate";
  import { ProfilePictures } from "../../../../../ts/userlogic/pfp";
  import ProfilePicture from "../../../../ProfilePicture.svelte";

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

    const userdata = await createUser(username, password);

    if (!userdata) {
      errored = true;

      return false;
    }

    UserData.set(userdata);
    UserName.set(username);

    applyState("desktop");

    return false;
  }
</script>

<ProfilePicture src={ProfilePictures.def} height={151} />
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
      disabled={loading || !username}
      bind:value={confirm}
    />
  </form>
  <button
    on:click={createAccount}
    disabled={loading || !username || !password || password != confirm}
    class="createbutton material-icons-round"
    type="button"
  >
    arrow_forward_ios
  </button>
</div>
