<script lang="ts">
  import { errorMessage } from "../../ts/errorlogic/main";

  let t: string;
  let m: string;
  let C1: string;
  let C2: string;

  function c() {
    errorMessage(
      t,
      m,
      null,
      "ErrCre",
      {
        caption: C1,
        action: () => {},
      },
      {
        caption: C2,
        action: () => {},
      }
    );
  }
</script>

<p>Specify the title and message to create an error message:</p>
<br />
<input placeholder="title" class="fullwidth" bind:value={t} />
<input placeholder="message" class="fullwidth" bind:value={m} />
<input placeholder="button caption 1" class="fullwidth" bind:value={C1} />
<input placeholder="button caption 2" class="fullwidth" bind:value={C2} />
<button on:click={c} disabled={!t || !m}>Create</button>
