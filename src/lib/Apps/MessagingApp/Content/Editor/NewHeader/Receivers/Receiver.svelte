<script lang="ts">
  import { onMount } from "svelte";
  import defaultProfile from "../../../../../../../assets/pfp/null.png";
  import { getUserPfp } from "../../../../../../../ts/api/pfp";
  import ProfilePicture from "../../../../../../ProfilePicture.svelte";
  import sleep from "../../../../../../../ts/sleep";

  export let receiver: string;
  export let receivers: string[];

  let pfp: string;

  onMount(async () => {
    pfp = await getUserPfp(receiver);
  });

  async function remove() {
    if (!receivers.includes(receiver)) return;

    receivers.splice(receivers.indexOf(receiver), 1);

    const x = [...receivers];

    receivers = [];
    await sleep(0);
    receivers = [...x];
  }
</script>

<div class="receiver-pill">
  <ProfilePicture src={pfp || defaultProfile} height={18} />
  <p class="name">{receiver}</p>
  <button class="material-icons-round remove" on:click={remove}>close</button>
</div>
