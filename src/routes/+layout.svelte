<script>
	import './style.css';
	let showSidebar = false;

	function toggleSidebar() {
		showSidebar = !showSidebar;
	}
</script>

<div class="container">
	<div class="header">
		<button class="hamburger-menu" on:click={toggleSidebar}>&#9776;</button>
		<a href="/">
			<h1 class="title">Anki</h1>
		</a>
	</div>

	<div class={`sidebar ${showSidebar ? 'show' : ''}`}>
		<button class="close-button" on:click={toggleSidebar}>x</button>
		<button class="menu-item" on:click={toggleSidebar}>
			<a href="/learn">Learn</a>
		</button>
		<button class="menu-item" on:click={toggleSidebar}>
			<a href="/edit">Edit</a>
		</button>
	</div>

	<div class="main-content">
		<slot />
	</div>
</div>

<style>
	.header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 20px;
		background-color: #305597;
		color: white;
		height: 50px;
	}

	.title {
		margin: 0;
	}

	.hamburger-menu {
		display: none;
		font-size: 24px;
		cursor: pointer;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 20px;
		background-color: #203a77;
		color: white;
		position: absolute;
		top: 0;
		left: 0;
		width: 200px;
		height: 100vh;
		transform: translateX(-100%);
		transition: transform 0.3s;
	}

	.sidebar.show {
		transform: translateX(0);
	}

	.close-button {
		padding: 15px 20px;
		cursor: pointer;
		background: none;
		border: none;
		color: white;
		text-align: left;
		display: none;
	}

	.menu-item {
		padding: 15px 20px;
		cursor: pointer;
		background: none;
		border: none;
		color: white;
	}

	.main-content {
		padding: 0px 10px;
	}

	@media (min-width: 768px) {
		.header {
			justify-content: center;
		}

		.hamburger-menu {
			display: none;
		}

		.sidebar {
			position: static;
			transform: none;
			flex-direction: row;
			height: auto;
			width: auto;
		}

		.sidebar a {
			padding: 10px 20px;
		}

		.main-content {
			margin-left: 0;
		}
	}

	@media (max-width: 767px) {
		.hamburger-menu {
			position: absolute;
			top: 50%;
			left: 20px;
			transform: translateY(-50%);
			display: block;
		}

		.sidebar {
			display: none;
			z-index: 1;
		}

		.sidebar.show {
			display: flex;
		}

		.close-button {
			display: block;
		}
	}
</style>
