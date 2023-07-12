
<script>
	import cursor from "./assets/cursor.png"
	import { onMount } from 'svelte';

	export let size = 200;
	export let color = 'black';
	export let shape = 'square';


	let x = -100;
	let y = -100;

	const cx = size / 2;
	const cy = size / 2;

	onMount(() => {
		/**
		 * initialises the cursor
		 *
		 */
		const initCursor = () => {
			document.addEventListener('mousemove', (e) => {
				x = e.clientX;
				y = e.clientY;
			});
			
		};

		initCursor();
	});
</script>

<div class="custom-cursor">
	<img src={cursor} alt="Cursor" class="custom-cursor {shape}"
  style="left: {x - cx}px; top: {y -
    cy}px;--size:{size}px; --background-color: {color}">
</div>

<style>
	.custom-cursor {
		transition: none !important;
		--background-color: 'black';
		--mix-blend-mode: 'none';
		--size: 200;
		mix-blend-mode: var(--mix-blend-mode);
		width: var(--size);
		height: var(--size);
		position: fixed;
		border-radius: 50%;
		pointer-events: none;
		z-index: 999999999999999999999;
		/* Customize your cursor styles here */
		cursor: none;
	}

	.custom-cursor.square {
		border-radius: 0;
	}
	* {
		cursor: none;
	}
</style>