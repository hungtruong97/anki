<script>
	import { db, collection, getDocs } from '../../../firebase.js';
	import { onMount } from 'svelte';
	import FlashCard from '../../../components/FlashCard.svelte';
	import Loading from '../../../components/Loading.svelte';
	export let data;
	let deck;
	let card;
	let isLoading = false;

	const loadRandomCard = async (cards) => {
		if (!cards) {
			return;
		}
		if (cards.length === 0) {
			await new Promise((resolve) => setTimeout(resolve, 100));
			if (deck.cards.length === 0) {
				return;
			}
		}
		const randomIndex = Math.floor(Math.random() * cards.length);
		card = cards[randomIndex];
		return card;
	};

	onMount(() => {
		isLoading = true;
		const decksCollectionRef = collection(db, 'decks');
		getDocs(decksCollectionRef)
			.then((snapshot) => {
				// Find the document you want to update
				const deckToShow = snapshot.docs.find((doc) => {
					return doc.data().name === data.name; // Find document with matching name
				});

				if (deckToShow) {
					deck = deckToShow.data();
					const cardsDocRef = collection(db, 'decks', deckToShow.id, 'cards');
					getDocs(cardsDocRef)
						.then((snapshot) => {
							deck.cards = snapshot.docs.map((doc) => doc.data());
							loadRandomCard(deck.cards).then((randomCard) => {
								card = randomCard;
							});
							isLoading = false;
						})
						.catch((error) => {
							console.error('Error getting documents: ', error);
						});
				} else {
					console.log('Document not found');
				}
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
			<FlashCard {card} />
			<button class="button randomButton" on:click={() => loadRandomCard(deck.cards)}>
				Random Card</button
			>
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

	.button {
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		border: none;
		border-radius: 5px;
		background-color: #305597;
		color: white;
	}

	@media (max-width: 768px) {
		.randomButton {
			padding: 10px 15px;
		}
	}
</style>
