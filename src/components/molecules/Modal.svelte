<script>
	import Text from '../atoms/Text.svelte';
	import HorizontalMargin from '../atoms/HorizontalMargin.svelte';
	import Button from '../atoms/Button.svelte';

	/** @type {string} What is the title of the deck? */
	export let title;

	/** @type {string} What is the label of the first button? */
	export let firstBtnLabel;

	/** @type {string} What is the label of the second button? */
	export let secondBtnLabel;

	/** @type {function} What should happen when the first button is clicked? */
	export let handleFirstBtnClick = () => {};

	/** @type {function} What should happen when the second button is clicked?*/
	export let handleSecondBtnClick = () => {};

	/** @type {string} Where should the first button navigate to? */
	export let firstBtnDestination = '';

	/** @type {string} Where should the second button navigate to? */
	export let secondBtnDestination = '';
</script>

<div class="container">
	<HorizontalMargin type="large" />
	<Text type="subtitle" text={title} />
	<HorizontalMargin type="large" />
	<div class="button-group">
		<Button
			type="secondary"
			label={firstBtnLabel}
			destination={firstBtnDestination}
			handleClick={handleFirstBtnClick}
		/>
		<Button
			type="primary"
			label={secondBtnLabel}
			destination={secondBtnDestination}
			handleClick={handleSecondBtnClick}
		/>
	</div>
</div>

<style>
	.container {
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 24px;
		border: 1px solid var(--primary);
		border-radius: 10px;
	}

	.button-group {
		display: flex;
		justify-content: space-between;
		gap: 24px;
	}
</style>
