import { db, collection, getDocs, writeBatch, doc } from '../firebase.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let decks;

async function fetchDecks() {
	const decksCollectionRef = collection(db, 'decks');
	const deckDocs = await getDocs(decksCollectionRef);
	decks = deckDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

fetchDecks().then(async () => {
	let batch = writeBatch(db);
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
	const data = JSON.parse(fs.readFileSync(`${__dirname}/ielts-vocab.json`, 'utf8'));

	decks.forEach((deck) => {
		if (deck.name === 'Ielts Vocabulary') {
			// Loop over each item in the data
			for (const item of data) {
				// Get a reference to the document
				const cardCollectionRef = collection(db, 'decks', deck.id, 'cards');
				const newCardRef = doc(cardCollectionRef);

				// Add an update operation to the batch
				batch.set(newCardRef, item);
			}
		}
	});

	await batch.commit().then(() => {
		console.log('Batch write successful');
	}); // Commit the batch writes
});
