<script lang="ts">
  // [caption,mod]
  const KEYS: [string, string][] = [
    ["1", "0"],
    ["2", "0"],
    ["3", "0"],
    ["/", "0"],
    ["4", "0"],
    ["5", "0"],
    ["6", "0"],
    ["-", "0"],
    ["7", "0"],
    ["8", "0"],
    ["9", "0"],
    [".", "0"],
    ["0", "0"],
    ["=", "0"],
    ["*", "0"],
  ];

  function process(key: [string, string]) {}
</script>

<input type="text" class="display" readonly />
<div class="keys">
  {#each KEYS as key}
    <button> {key[0]}</button>
  {/each}
</div>
