<script>
	import { db, collection, getDocs } from '../../firebase';
	import { onMount } from 'svelte';
	import DeckRow from '../../components/DeckRow.svelte';
	import Loading from '../../components/Loading.svelte';
	let decks;
	let isLoading = false;

	onMount(async () => {
		isLoading = true;
		const decksCollectionRef = collection(db, 'decks');
		const deckDocs = await getDocs(decksCollectionRef);
		decks = await Promise.all(
			deckDocs.docs.map(async (doc) => {
				const deckData = doc.data();
				const cardsCollectionRef = collection(doc.ref, 'cards');
				const cardsSnapshot = await getDocs(cardsCollectionRef);
				return { ...deckData, size: cardsSnapshot.size };
			})
		);
		isLoading = false;
	});

	onMount(() => {
		const decksCollectionRef = collection(db, 'decks');
		getDocs(decksCollectionRef)
			.then((snapshot) => {
				// Create an empty array to store the JSON data
				const jsonData = [];

				// Iterate through the documents
				snapshot.forEach((doc) => {
					// Convert each document to a JSON object
					const data = doc.data();
					jsonData.push(data);
				});

				// Output the JSON data to the console
				console.log(JSON.stringify(jsonData));
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
		{#if !decks}
			<h2>No decks found</h2>
			<button class="button">
				<a href="/create-deck">Create a deck</a>
			</button>
		{:else}
			<h2>Choose a deck to edit</h2>
			{#each decks as deck}
				<DeckRow {deck} flow="edit" />
			{/each}
		{/if}
	</div>
{/if}

<style>
	.button {
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		border: none;
		border-radius: 5px;
		background-color: #305597;
		color: white;
	}
</style>
