<script>
	import 'src/style.css';
	import Text from '../atoms/Text.svelte';
	import { goto } from '$app/navigation';
	import { selectedDeckName } from 'src/lib/store.js';

	/** @type {'deck' | 'create'} What type of card is this */
	export let type;

	/** @type {string} What is the title of this deck */
	export let title;

	/** @type {string} What is the number of cards in this deck */
	export let numberOfCards;

	const onClick = () => {
		if (type === 'deck') {
			selectedDeckName.set(title);
			goto(`/learn/${title}`);
		} else {
			goto('/create');
		}
	};
</script>

<button class="container" on:click={onClick}>
	{#if type === 'deck'}
		<Text type="subtitle" text={title} />
		<div class="icon">
			<img src="/cards.png" alt="" />
		</div>
		<Text type="body" text={`${numberOfCards} cards`} />
	{:else if type === 'create'}
		<Text type="body" text="Create a new deck" />
		<div class="icon">
			<img src="/add.png" alt="" />
		</div>
	{/if}
</button>

<style>
	.container {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		border: 1px solid var(--tertiary);
		width: 100%;
		max-width: 160px;
		height: 150px;
		border-radius: 10px;
		gap: 7px;
		padding: 8px;
		text-align: center;
	}

	.icon {
		width: 48px;
		height: 48px;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
