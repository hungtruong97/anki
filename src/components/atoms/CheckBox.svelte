<script>
	import 'src/style.css';

	/** @type {string} What is the label of this checkbox? */
	export let label;

	/** @type {function} What should happen when the checkbox is checked? */
	export let handleCheckBoxChange = () => {};
</script>

<form>
	<input type="checkbox" on:change={handleCheckBoxChange} />
	<label for="checkbox">{label}</label>
</form>

<style>
	form {
		display: flex;
		align-items: center;
	}

	input {
		margin-right: 8px;
	}

	label {
		font-size: 12px;
	}
</style>
