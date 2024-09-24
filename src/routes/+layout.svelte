<script>
	import Header from '../components/atoms/Header.svelte';
	import Footer from '../components/atoms/Footer.svelte';
</script>

<div class="container">
	<Header />
	<div class="main-content">
		<slot />
	</div>
	<Footer />
</div>

<style>
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding-bottom: 40px;
	}
	.main-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 0 24px;
		flex: 1;
	}
</style>
