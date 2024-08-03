<script>
</script>

<div class="container">
	<h1>Welcome to Anki!</h1>
	<a href="/learn"> Start learning</a>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		height: 100vh;
	}

	h1 {
		margin-bottom: 20px;
	}

	a {
		text-decoration: none;
		color: white;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		background-color: #007bff;
		color: white;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 20px;
		}
	}
</style>
