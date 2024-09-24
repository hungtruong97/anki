<script>
	import 'src/style.css';
	export let type = 'small';
</script>

{#if type == 'small'}
	<div class="small"></div>
{:else if type == 'medium'}
	<div class="medium"></div>
{:else if type == 'large'}
	<div class="large"></div>
{:else if type == 'extra-large'}
	<div class="extra-large"></div>
{/if}

<style>
	.small {
		width: 100%;
		height: 8px;
	}

	.medium {
		width: 100%;
		height: 16px;
	}

	.large {
		width: 100%;
		height: 24px;
	}

	.extra-large {
		width: 100%;
		height: 32px;
	}
</style>
