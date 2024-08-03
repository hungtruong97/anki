import { db, collection, getDocs } from '../firebase';

let decks;

async function fetchDecks() {
	const decksCollectionRef = collection(db, 'decks');
	const deckDocs = await getDocs(decksCollectionRef);
	decks = deckDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

fetchDecks().then(() => {
	let batch = writeBatch(db);

	decks.forEach((deck) => {
		let deckRef = doc(db, 'decks', deck.id);
		batch.update(deckRef, {
			/* your update data here */
		});

		deck.cards.forEach((card) => {
			let cardRef = doc(deckRef, 'cards', card.id);
			batch.update(cardRef, {
				/* your update data here */
			});
		});
	});
});
