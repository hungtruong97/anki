<script>
	import Text from 'src/components/atoms/Text.svelte';
	import CheckBox from '../atoms/CheckBox.svelte';
	import 'src/style.css';

	/** @type {'front' | 'back'} What side is this card  */
	export let side;

	/** @type {string} What is the front line 1 of this card? */
	export let frontLine1 = '';

	/** @type {string} What is the front line 2 of this card? */
	export let frontLine2 = '';

	/** @type {string} What is the back line 1 of this card? */
	export let backLine1 = '';

	/** @type {string} What is the back line 2 of this card? */
	export let backLine2 = '';

	/** @type {boolean} Does this card has image */
	export let hasImage = false;

	/** @type {string} What is the image source of this card? */
	export let imageSrc = '';

	/** @type {function} Handle click event */
	export let handleClick = () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container {side}" on:click={handleClick}>
	{#if side === 'front'}
		{#if hasImage}
			<div class="img">
				<img src={imageSrc} alt="" />
			</div>
			<Text type="subtitle" text={frontLine1} />
		{:else}
			<Text type="subtitle" text={frontLine1} />
			{#if frontLine2 !== '' && frontLine2 !== undefined}
				<Text type="body" text={frontLine2} />
			{/if}
		{/if}
	{:else if side === 'back'}
		{#if hasImage}
			<div class="img">
				<img src={imageSrc} alt="" />
			</div>
			<Text type="subtitle" text={backLine1} />
			<CheckBox class="checkBox" label="Save for edit" />
		{:else}
			<Text type="subtitle" text={backLine1} />
			{#if backLine2 !== '' && backLine2 !== undefined}
				<Text type="body" text={backLine2} />
			{/if}
			<div class="checkBox">
				<CheckBox label="Save for edit" />
			</div>
		{/if}
	{/if}
</div>

<style>
	.container {
		width: 100%;
		max-width: 360px;
		height: 224px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 24px;
		gap: 16px;
		border-radius: 10px;
		position: relative;
	}

	.front {
		border: 1px solid var(--primary);
	}

	.back {
		background: #f7ecf8;
		border: 1px solid var(--secondary);
		color: var(--text-color);
	}

	.img {
		width: 200px;
		height: 120px;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.checkBox {
		position: absolute;
		left: 50%;
		bottom: 24px;
		transform: translateX(-50%);
	}
</style>
