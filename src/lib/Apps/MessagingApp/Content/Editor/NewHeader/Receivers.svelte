<script lang="ts">
  import sleep from "../../../../../../ts/sleep";
  import type { UserData } from "../../../../../../ts/userlogic/interfaces";
  import Receiver from "./Receivers/Receiver.svelte";

  export let users: [string, UserData][];
  export let receivers: string[];

  async function add() {
    if (input == "none") return;

    receivers.push(input);

    const x = [...receivers];

    receivers = [];
    await sleep(0);
    receivers = [...x];

    input = "none";
  }

  let input: string;
</script>

<div class="opt receivers">
  <p class="caption">Recipients</p>
  <div>
    {#if receivers.length}
      <div class="current">
        {#each receivers as receiver}
          <Receiver bind:receivers {receiver} />
        {/each}
      </div>
    {/if}
    {#if users.length !== receivers.length}
      <select class="adder" bind:value={input} on:change={add}>
        <option value="none" disabled selected>Add...</option>
        {#each users as [name, _]}
          {#if !receivers.includes(name)}
            <option value={name}>{name}</option>
          {/if}
        {/each}
      </select>
    {/if}
  </div>
</div>
