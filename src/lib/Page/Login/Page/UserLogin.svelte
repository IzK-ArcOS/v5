<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "@css/login/userlogin.css";
  import Spinner from "../../../../lib/Spinner.svelte";
  import { generateCredToken } from "$$ts/api/cred";
  import { loginUsingCreds } from "$$ts/api/getter";
  import { apiCall, ConnectedServer } from "$$ts/api/main";
  import { applyLoginState, loginUsername } from "$$ts/login/main";
  import { applyState } from "$$ts/state/main";
  import { UserData, UserName, UserToken } from "$$ts/userlogic/interfaces";
  import { getUserdata } from "$$ts/userlogic/main";
  import { getProfilePicture } from "$$ts/userlogic/pfp";
  import ProfilePicture from "../../../ProfilePicture.svelte";

  let name: string;
  let data: UserData;
  let pfp = "";

  let stay = false;
  let authenticating = false;
  let password = "";
  let show = false;
  let wrongpswd = false;

  onMount(async () => {
    name = get(loginUsername);
    if (name) {
      data = await getUserdata(name);

      pfp = getProfilePicture(data.acc.profilePicture);

      if (!$ConnectedServer)
        setTimeout(async () => {
          UserData.set(await getUserdata(name));
          UserName.set(name);

          applyState("desktop");
        }, 2000);
    } else {
      applyLoginState("selector");
    }

    setTimeout(() => {
      show = true;
    }, 10);
  });

  async function serverLogin() {
    authenticating = true;

    const userdata = await loginUsingCreds(
      generateCredToken({ username: name, password })
    );

    if (!userdata) {
      authenticating = false;
      wrongpswd = true;
      return;
    }

    if (stay) {
      localStorage.setItem(
        "arcos-remembered-token",
        btoa(`${name}:${password}`)
      );
    }

    UserData.set(userdata);
    UserName.set(name);

    applyState("desktop");
  }

  function submit(e: Event) {
    e.preventDefault();

    serverLogin();

    return false;
  }
</script>

{#if name && data}
  <div class="userlogin" class:show>
    <ProfilePicture src={pfp} height={151} />
    <h1>{name}</h1>
    {#if !$ConnectedServer || authenticating}
      <h3><Spinner height={23} />&nbsp;<span>Welcome</span></h3>
    {:else}
      <div class="cloudlogin">
        <div class="field">
          <form on:submit={submit}>
            <!-- svelte-ignore a11y-autofocus -->
            <input
              autofocus
              bind:value={password}
              type="password"
              placeholder="Password"
              on:input={() => (wrongpswd = false)}
              class:wrongpswd
            />
          </form>
          <button
            class="material-icons-round"
            on:click={serverLogin}
            disabled={!password}>arrow_forward_ios</button
          >
        </div>
        <span class="keep-loggedin-wrapper">
          <input type="checkbox" id="rememberme" bind:value={stay} />
          <label for="rememberme">Stay logged in</label>
        </span>
      </div>
    {/if}
  </div>
{/if}

{#if $ConnectedServer && !authenticating}
  <button
    class="switchuser"
    class:show
    on:click={() => applyLoginState("selector")}>Cancel</button
  >
{/if}
