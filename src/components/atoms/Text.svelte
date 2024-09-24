<script>
	import 'src/style.css';

	export let type = 'title';
	export let text = '';
</script>

{#if type === 'title'}
	<div class="text title">
		{text}
	</div>
{:else if type === 'subtitle'}
	<div class="text subtitle">
		{text}
	</div>
{:else if type === 'body'}
	<div class="text body">
		{text}
	</div>
{:else if type === 'subtext'}
	<div class="text subtext">
		{text}
	</div>
{/if}

<style>
	.text {
		margin: unset;
	}

	.title {
		font-size: 24px;
		font-weight: 600;
	}

	.subtitle {
		font-size: 16px;
		font-weight: 500;
	}

	.body {
		font-size: 12px;
		font-weight: 400;
	}

	.subtext {
		font-size: 8px;
		font-weight: 400;
	}
</style>
