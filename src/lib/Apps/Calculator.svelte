<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop/apps/calculator.css";
  import {
    CalculatorClass,
    CalculatorValue,
  } from "../../ts/applogic/apps/Calculator/main";
  import { Log, LogLevel } from "../../ts/console";

  let value = "";

  onMount(() => {
    CalculatorValue.subscribe((v) => {
      Log({
        source: "Calculator: CalculatorValue.subscribe",
        msg: `Value of CalculatorValue<string> changed to "${$CalculatorValue}"`,
        level: LogLevel.info,
      });

      value = v || "0";
    });
  });

  function clear() {
    CalculatorValue.set("");
  }
</script>

<input type="text" class="display" readonly {value} />
<div class="keys">
  {#each CalculatorClass.keys as key}
    {#if !key[0].startsWith("%%")}
      <button
        on:click={() => CalculatorClass.processKey(key[1])}
        class:empty={!key[0]}
        class:alt={CalculatorClass.altClasses.includes(key[1])}
      >
        {key[0]}
      </button>
    {:else}
      <button
        on:click={CalculatorClass.keyFunctions[key[0]][1]}
        class={CalculatorClass.keyFunctions[key[1]][2]}
      >
        {CalculatorClass.keyFunctions[key[1]][0]}
      </button>
    {/if}
  {/each}
</div>
