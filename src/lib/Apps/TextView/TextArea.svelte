<script lang="ts">
  export let onchange: () => void;
  export let fileContents: string;
</script>

<textarea
  bind:value={fileContents}
  spellcheck={false}
  on:change={onchange}
  on:input={onchange}
  on:keydown={onchange}
/>
