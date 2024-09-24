<script>
	import { selectedDeckName } from 'src/lib/store.js';
	import { db, collection, getDocs } from '../../../firebase.js';
	import { onMount, onDestroy } from 'svelte';
	import FlashCard from '../../../components/molecules/FlashCard.svelte';
	import Loading from '../../../components/atoms/Loading.svelte';
	import Text from '../../../components/atoms/Text.svelte';
	import HorizontalMargin from '../../../components/atoms/HorizontalMargin.svelte';
	import Button from '../../../components/atoms/Button.svelte';
	import CheckBox from '../../../components/atoms/CheckBox.svelte';
	import Modal from '../../../components/molecules/Modal.svelte';
	import { deckStore } from 'src/lib/store.js';

	let deck;
	let cards = [];
	let card;
	let isLoading = false;
	let isShowResult = false;
	let isShowQuitModal = false;
	let isFinished = false;

	// Load a random card from the deck
	const loadRandomCard = () => {
		if (!cards || cards.length === 0) {
			return;
		}
		// Filter out the cards that are hidden or have been shown 3 times
		const showableCards = cards.filter((card) => {
			return !card.isHidden && card.count < 3;
		});

		// If there are no more showable cards, the user has finished studying
		if (showableCards.length === 0) {
			isFinished = true;
			cards.forEach((card) => {
				card.count = 0;
				card.isHidden = false;
			});
			return;
		}
		const randomIndex = Math.floor(Math.random() * showableCards.length);
		return showableCards[randomIndex];
	};

	// Handle the checkbox change
	const handleCheckBoxChange = (isChecked) => {
		const cardIndex = cards.findIndex((c) => c.id === card.id);
		if (cardIndex !== -1) {
			if (isChecked) {
				cards[cardIndex].isHidden = true;
			} else {
				cards[cardIndex].isHidden = false;
			}
		}
	};

	// Show the back side of the card
	const showResult = () => {
		isShowResult = true;
	};

	//Toggle the quit modal
	const toggleSwitchModal = () => {
		isShowQuitModal = !isShowQuitModal;
	};

	// Increment the card count
	function incrementCardCount() {
		const cardIndex = cards.findIndex((c) => c.id === card.id);
		if (cardIndex !== -1) {
			cards[cardIndex].count += 1;
		}
	}

	// Decrement the card count
	function decrementCardCount() {
		const cardIndex = cards.findIndex((c) => c.id === card.id);
		if (cardIndex !== -1) {
			cards[cardIndex].count -= 1;
		}
	}

	onMount(() => {
		// Get the selected deck from the deck store if it exists
		isLoading = true;
		deck = $deckStore.find((deck) => deck.name === $selectedDeckName);
		if (deck && deck.cards && deck.cards !== 0) {
			cards = [...deck.cards];
			card = loadRandomCard();
			isLoading = false;
		} else {
			// If not, get the selected deck from the database
			const decksCollectionRef = collection(db, 'decks');
			getDocs(decksCollectionRef)
				.then((snapshot) => {
					// Find the document you want to update
					const deckToShow = snapshot.docs.find((doc) => {
						return doc.data().name === $selectedDeckName; // Find document with matching name
					});

					if (deckToShow) {
						deck = deckToShow.data();
						const cardsDocRef = collection(db, 'decks', deckToShow.id, 'cards');
						getDocs(cardsDocRef)
							.then((snapshot) => {
								cards = snapshot.docs.map((doc) => ({ ...doc.data(), count: 0 }));
								card = loadRandomCard();
								isLoading = false;
							})
							.catch((error) => {
								console.error('Error getting documents: ', error);
							});
					}
				})
				.catch((error) => {
					console.error('Error getting documents: ', error);
				});
		}
	});

	onDestroy(() => {
		const deckIndex = $deckStore.findIndex((d) => d.name === deck.name);
		if (deckIndex !== -1) {
			$deckStore[deckIndex] = { ...$deckStore[deckIndex], cards: cards };
		}
	});
</script>

{#if isLoading}
	<Loading />
{:else}
	<div class="container">
		<HorizontalMargin type="large" />
		{#if !deck}
			<Text type="subtitle" text="Deck not found" />
		{:else}
			<Text type="subtitle" text={deck.name} />
			<HorizontalMargin type="medium" />
			{#if card}
				<FlashCard
					side="front"
					frontLine1={card.frontLine1}
					frontLine2={card.frontLine2}
					handleClick={() => {
						showResult();
					}}
				/>
			{/if}
		{/if}
		{#if isShowResult}
			<HorizontalMargin type="large" />
			<FlashCard side="back" backLine1={card.backLine1} backLine2={card.backLine2} />
			<HorizontalMargin type="large" />
			<Text type="body" text="How did you do?" />
			<HorizontalMargin type="small" />
			<div class="button-group">
				<Button
					type="secondary"
					label="&#x2705"
					handleClick={() => {
						incrementCardCount();
						card = loadRandomCard();
						isShowResult = false;
					}}
				/>
				<Button
					type="secondary"
					label="&#x274C"
					handleClick={() => {
						decrementCardCount();
						card = loadRandomCard();
						isShowResult = false;
					}}
				/>
			</div>
			<HorizontalMargin type="medium" />
			<CheckBox
				label="Do not show this card again"
				handleCheckBoxChange={(e) => handleCheckBoxChange(e.target.checked)}
			/>
			<HorizontalMargin type="extra-large" />
			<Button
				type="danger"
				label="Quit"
				handleClick={() => {
					toggleSwitchModal();
				}}
			/>
			<HorizontalMargin type="extra-large" />
		{/if}

		{#if isShowQuitModal}
			<div class="overlay">
				<Modal
					title="Are you sure you want to quit?"
					firstBtnLabel="Yes"
					firstBtnDestination="/learn"
					secondBtnLabel="No"
					handleSecondBtnClick={() => {
						toggleSwitchModal();
					}}
				/>
			</div>
		{/if}

		{#if isFinished}
			<div class="overlay">
				<Modal
					title="Congratulations! You have finished studying all the cards in this deck."
					firstBtnLabel="Go back"
					firstBtnDestination="/learn"
					secondBtnLabel="Try again"
					handleSecondBtnClick={() => {
						isFinished = false;
						card = loadRandomCard();
					}}
				/>
			</div>
		{/if}
	</div>
{/if}

<style>
	.container {
		position: relative;
		flex: 1;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.button-group {
		display: flex;
		justify-content: space-between;
		gap: 24px;
	}
</style>
