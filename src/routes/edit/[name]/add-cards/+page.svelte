<script>
	import { selectedDeckName } from 'src/lib/store';
	import Button from 'src/components/Button.svelte';
	import { db, collection, getDocs, addDoc } from 'src/firebase';
	import { goto } from '$app/navigation';
	let deck;
	let frontLine1 = '';
	let frontLine2 = '';
	let backLine1 = '';
	let backLine2 = '';
	let isMessageShown = false;
	let isError = false;
	let message = 'Document added successfully!';

	const handleSubmit = () => {
		const decksCollectionRef = collection(db, 'decks');
		getDocs(decksCollectionRef)
			.then(async (snapshot) => {
				// Find the document you want to update
				const deckToShow = snapshot.docs.find((doc) => {
					return doc.data().name === $selectedDeckName; // Find document with matching name
				});

				if (deckToShow) {
					deck = deckToShow.data();
					const cardsCollectionRef = collection(db, 'decks', deckToShow.id, 'cards');
					try {
						await addDoc(cardsCollectionRef, {
							frontLine1,
							frontLine2,
							backLine1,
							backLine2
						});
						console.log('Document added');
						isMessageShown = true;
					} catch (error) {
						isMessageShown = false;
						isError = true;
						message = 'Error adding document';
						console.log('Error adding document: ', error);
					}
				} else {
					console.log('Document not found');
				}
			})
			.catch((error) => {
				console.error('Error getting documents: ', error);
			});
	};

	const handleAddNewCard = () => {
		isMessageShown = false;
		isError = false;
		frontLine1 = '';
		frontLine2 = '';
		backLine1 = '';
		backLine2 = '';
		goto(`/edit/${selectedDeckName}/add-cards`);
	};
</script>

<div class="container">
	<h2>Add a New Card</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<label>
			Front Line 1:
			<input type="text" bind:value={frontLine1} />
		</label>
		<label>
			Front Line 2:
			<input type="text" bind:value={frontLine2} />
		</label>
		<label>
			Back Line 1:
			<input type="text" bind:value={backLine1} />
		</label>
		<label>
			Back Line 2:
			<input type="text" bind:value={backLine2} />
		</label>
	</form>
	{#if isMessageShown}
		{#if isError}
			<div class="error">{message}</div>
		{:else}
			<div class="message">{message}</div>
		{/if}
		<Button text="Add Another Card" handleClick={handleAddNewCard}></Button>
	{:else}
		<Button text="Add Card" handleClick={handleSubmit}></Button>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
		gap: 15px;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 15px;
	}

	.error {
		color: red;
	}

	.message {
		color: green;
	}
</style>
