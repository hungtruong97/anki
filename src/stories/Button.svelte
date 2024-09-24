<script>
	import 'src/style.css';
	import { goto } from '$app/navigation';

	/**
	 * @type {'primary' | 'secondary' | 'danger'} Which type is this button?
	 */
	export let type = 'primary';

	/**
	 * @type {string} What text should be displayed on the button?
	 */
	export let label = '';

	/**
	 * @type {string} Where should the button navigate to?
	 */
	export let destination = '';

	/**
	 * @type {function} What should happen when the button is clicked?
	 */
	export let handleClick = () => {};

	const onClick = () => {
		if (destination !== '') {
			goto(destination);
		} else {
			handleClick();
		}
	};
</script>

<button type="button" class={['container', `${type}`].join(' ')} on:click={onClick(destination)}>
	{label}
</button>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 156px;
		height: 44px;
		color: var(--text-white);
		border: none;
		border-radius: 10px;
		cursor: pointer;
		font-size: 12px;
	}

	.primary {
		background-color: var(--secondary);
	}

	.secondary {
		background-color: white;
		color: var(--text-color);
		border: 1px solid var(--secondary);
	}

	.danger {
		background-color: #dc3545;
	}
</style>
