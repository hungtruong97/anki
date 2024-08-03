<script>
	import { goto } from '$app/navigation';
	export let type = 'normal';
	export let text = '';
	export let destination = '';
	export let handleClick = () => {};

	const onClick = () => {
		if (destination !== '') {
			goto(destination);
		} else {
			handleClick();
		}
	};
</script>

{#if type === 'normal'}
	<button class="container" on:click={onClick(destination)}>
		{text}
	</button>
{:else if type === 'danger'}
	<button class="container danger" on:click={onClick(destination)}>
		{text}
	</button>
{/if}

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		width: 100%;
		max-width: 200px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.danger {
		background-color: #dc3545;
	}
</style>
