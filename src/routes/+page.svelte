<script>
	import Text from '../components/atoms/Text.svelte';
	import Button from '../components/atoms/Button.svelte';
	import HorizontalMargin from '../components/atoms/HorizontalMargin.svelte';
</script>

<div class="container">
	<Text type="title" text="Welcome to Anki!" />
	<HorizontalMargin type="medium" />
	<Button label="Get Started" destination="/learn" />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		flex: 1;
	}
</style>
