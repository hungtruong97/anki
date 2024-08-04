<script>
	import { deckName } from 'src/lib/store.js';
	import { db, collection, getDocs } from '../../../firebase.js';
	import { onMount } from 'svelte';
	import Loading from '../../../components/Loading.svelte';
	import Button from '../../../components/Button.svelte';
	let deck;
	let isLoading = false;

	onMount(() => {
		console.log(deckName);
		isLoading = true;
		const decksCollectionRef = collection(db, 'decks');
		getDocs(decksCollectionRef)
			.then((snapshot) => {
				// Find the document you want to update
				const deckToShow = snapshot.docs.find((doc) => doc.data().name === $deckName);

				isLoading = false;
				deck = deckToShow.data();
			})
			.catch((error) => {
				console.error('Error getting documents: ', error);
			});
	});
</script>

{#if isLoading}
	<Loading />
{:else}
	<div class="container">
		{#if !deck}
			<h1>Deck not found</h1>
		{:else}
			<h1>{deck.name}</h1>
			<div class="button-group">
				<Button text="Add New Cards" destination="/edit/{deck.name}/add-cards" />
				<Button text="Edit Existing Cards" destination="/edit/{deck.name}/edit-cards" />
				<Button text="Delete Deck" destination="/edit/{deck.name}/delete" type="danger" />
			</div>
		{/if}
	</div>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.button-group {
		display: flex;
		flex-direction: column;
		gap: 15px;
		width: 100%;
		max-width: 200px;
		text-align: center;
		align-items: center;
		justify-content: center;
	}
</style>
