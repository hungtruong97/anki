<script>
	import { db, collection, getDocs } from '../../firebase.js';
	import { onMount } from 'svelte';
	import Loading from '../../components/atoms/Loading.svelte';
	import DeckCard from '../../components/molecules/DeckCard.svelte';
	import Text from '../../components/atoms/Text.svelte';
	import HorizontalMargin from '../../components/atoms/HorizontalMargin.svelte';
	import Button from '../../components/atoms/Button.svelte';
	import { deckStore } from 'src/lib/store.js';
	let decks;
	let isLoading;

	onMount(async () => {
		isLoading = true;
		if ($deckStore.length !== 0) {
			decks = $deckStore;
			isLoading = false;
			console.log(decks);
		} else {
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
			deckStore.set(decks);
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<Loading />
{:else}
	<div class="container">
		<HorizontalMargin type="large" />

		{#if !decks}
			<Text type="subtitle" text="You have no decks" />
			<HorizontalMargin type="medium" />
			<Button type="primary" label="Create a new deck" destination="/create" />
		{:else}
			<Text type="subtitle" text="What do you want to learn today?" />
			<HorizontalMargin type="medium" />
			<div class="deck-list">
				{#each decks as deck}
					<DeckCard type="deck" title={deck.name} numberOfCards={deck.size} />
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.deck-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
	}
</style>
