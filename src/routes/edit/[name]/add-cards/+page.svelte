<script>
	import Button from 'src/components/Button.svelte';
	import { db, collection, getDocs, addDoc } from 'src/firebase';
	let deckName = 'HSK 1';
	let deck;
	let frontLine1 = '';
	let frontLine2 = '';
	let backLine1 = '';
	let backLine2 = '';

	const handleSubmit = () => {
		const decksCollectionRef = collection(db, 'decks');
		getDocs(decksCollectionRef)
			.then(async (snapshot) => {
				// Find the document you want to update
				const deckToShow = snapshot.docs.find((doc) => {
					return doc.data().name === deckName; // Find document with matching name
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
					} catch (error) {
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
	<Button text="Add Card" handleClick={handleSubmit}></Button>
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
</style>
