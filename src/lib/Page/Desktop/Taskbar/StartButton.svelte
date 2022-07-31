<script lang="ts">
import { startOpened } from "../../../../ts/desktop/main";

    import arcos from "../../../../assets/systemIcon.svg";

    function toggle() {
        $startOpened = !$startOpened;
    }
</script>

<button class="start" class:open={$startOpened} on:click={toggle}>
    <img src={arcos} alt="ArcOS Logo"/>
</button>