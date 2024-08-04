<script>
	export let card;
	let flipped = false;

	function flipCard() {
		flipped = !flipped;
	}

	$: if (card) {
		flipped = false;
	}
</script>

<div class="container">
	<button class="card" on:click={flipCard}>
		<div class="card-inner" style="transform: rotateY({flipped ? 180 : 0}deg);">
			{#if !flipped}
				<div class="card-front">
					{#if card}
						<p>{card.frontLine1}</p>
						<p>{card.frontLine2}</p>
					{/if}
				</div>
			{:else}
				<div class="card-back">
					{#if card}
						<p>{card.backLine1}</p>
						<p>{card.backLine2}</p>
					{/if}
				</div>
			{/if}
		</div>
	</button>
</div>

<style>
	.container {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
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
		border: 5px solid #007bff;
	}

	.card-back {
		transform: rotateY(180deg);
		background-color: #e7e7f6;
	}

	@media (max-width: 768px) {
		.container {
			width: 90%;
		}
		.card {
			width: 100%;
		}
	}
</style>
