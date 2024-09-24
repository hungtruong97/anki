<script>
	import Button from '../../../../components/atoms/Button.svelte';
	let searchTerm = '';

	const handleSubmit = () => {
		console.log(searchTerm);
	};
</script>

<div class="container">
	<h2>Edit Cards</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<label>
			Search for a card to edit
			<input type="text" bind:value={searchTerm} />
		</label>
	</form>
	<Button text="Search" handleClick={handleSubmit}></Button>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		max-width: 300px;
		margin-bottom: 20px;
	}
</style>
