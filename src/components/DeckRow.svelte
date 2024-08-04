<script>
	import { deckName } from 'src/lib/store.js';
	export let deck;
	export let flow = 'learn';
</script>

<div class="row">
	<a
		class="name"
		href="/{flow}/{deck.name}"
		on:click={() => {
			deckName.set(deck.name);
		}}
	>
		{deck.name}
	</a>
	<div class="quantity">
		{deck.size}
	</div>
</div>

<style>
	.row {
		display: flex;
		justify-content: space-between;
		padding: 10px 20px;
		border-bottom: 1px solid #ccc;
	}

	.name {
		font-size: 1.2rem;
	}

	.name:hover {
		text-decoration: underline;
	}

	.quantity {
		font-size: 1.2rem;
	}
</style>
