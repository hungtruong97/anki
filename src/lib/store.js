import { writable } from 'svelte/store';

export const selectedDeckName = writable('');

export const deckStore = writable([]);

export const cardStore = writable([]);
