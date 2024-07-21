<script>
	import { onMount } from 'svelte';
	export let cards = [];
	let flashcard;
	let flipped = false;

	function flipCard() {
		flipped = !flipped;
	}

	async function loadRandomCard() {
		if (cards.length === 0) {
			await new Promise((resolve) => setTimeout(resolve, 100));
			if (cards.length === 0) {
				return;
			}
		}
		const randomIndex = Math.floor(Math.random() * cards.length);
		flashcard = { ...cards[randomIndex].card };
		flipped = false;
		console.log(flashcard);
	}

	onMount(() => {
		loadRandomCard();
		console.log(flashcard);
	});
</script>

<div class="container">
	<button class="card" on:click={flipCard}>
		<div class="card-inner" style="transform: rotateY({flipped ? 180 : 0}deg);">
			<div class="card-front">
				{#if flashcard}
					<p>{flashcard.frontCard.kanji}</p>
					<p>{flashcard.frontCard.pronunciation}</p>
				{/if}
			</div>
			<div class="card-back">
				{#if flashcard}
					<p>{flashcard.backCard.meaningEN}</p>
					<p>{flashcard.backCard.meaningVN}</p>
				{/if}
			</div>
		</div>
	</button>
	<button class="random" on:click={loadRandomCard}>Random</button>
</div>

<style>
	.container {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		flex-direction: column;
		gap: 20px;
	}

	.card {
		width: 300px;
		height: 200px;
		perspective: 1000px;
		margin-bottom: 20px;
		border: none;
		background-color: transparent;
	}

	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 0.6s;
		transform-style: preserve-3d;
		cursor: pointer;
	}

	.card-front,
	.card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: 20px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		background-color: #ffffff;
		color: black;
	}

	.card-back {
		transform: rotateY(180deg);
	}

	.random {
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		border: none;
		border-radius: 5px;
		background-color: #305597;
		color: white;
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 20px;
		}

		.card {
			width: 100%;
		}

		.random {
			padding: 10px 15px;
		}
	}
</style>
