<script>
	import Text from './Text.svelte';

	let year = new Date().getFullYear();
</script>

<div class="container">
	<Text type="body" text="® Copyright {year}" />
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		background-color: var(--primary);
		width: 100%;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
</style>
