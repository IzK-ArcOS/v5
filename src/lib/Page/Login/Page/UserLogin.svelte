<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import "../../../../css/login/userlogin.css";
  import Spinner from "../../../../lib/Spinner.svelte";
  import { apiCall, ConnectedServer } from "../../../../ts/api/main";
  import { applyLoginState, loginUsername } from "../../../../ts/login/main";
  import { applyState } from "../../../../ts/state/main";
  import {
    UserData,
    UserName,
    UserToken,
  } from "../../../../ts/userlogic/interfaces";
  import { getUserdata } from "../../../../ts/userlogic/main";
  import { getProfilePicture } from "../../../../ts/userlogic/pfp";

  let name: string;
  let data: UserData;
  let pfp = "";

  let authenticating = false;

  let password = "";

  onMount(async () => {
    name = get(loginUsername);
    if (name) {
      data = await getUserdata(name);

      pfp = getProfilePicture(parseInt(data.acc.profilePicture as string));

      if (!$ConnectedServer)
        setTimeout(async () => {
          UserData.set(await getUserdata(name));
          UserName.set(name);

          applyState("desktop");
        }, 2000);
    } else {
      applyLoginState("selector");
    }
  });

  async function serverLogin() {
    authenticating = true;

    let req = await apiCall($ConnectedServer, "auth", {}, null, {
      username: name,
      password,
    });

    if (!req.valid) return false;

    UserToken.set(req.data.token);

    console.log(req);

    req = await apiCall(
      $ConnectedServer,
      `user/properties`,
      {},
      $UserToken,
      null
    );

    if (!req.valid) return false;

    console.log("Heading to desktop");

    UserData.set(req);
    UserName.set(name);

    console.warn($UserData, $UserName);

    applyState("desktop");
  }
</script>

{#if name && data}
  <div class="userlogin">
    <img src={pfp} alt="pfp" />
    <h1>{name}</h1>
    {#if !$ConnectedServer || authenticating}
      <h3><Spinner height={23} />&nbsp;<span>Welcome</span></h3>
    {:else}
      <div class="cloudlogin">
        <div class="field">
          <form>
            <input
              bind:value={password}
              type="password"
              placeholder="Password"
            />
          </form>
          <button
            class="material-icons"
            on:click={serverLogin}
            disabled={!password}>arrow_forward_ios</button
          >
        </div>
      </div>
    {/if}
  </div>
{/if}

{#if $ConnectedServer && !authenticating}
  <button class="switchuser" on:click={() => applyLoginState("selector")}
    >Cancel</button
  >
{/if}
