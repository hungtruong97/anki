<script>
	import 'src/style.css';

	/** @type {string} What is the name of this input field? */
	export let name;

	/** @type {string} What is the label of this input field? */
	export let label;

	/** @type {string} What type of input field is this? */
	export let type = 'text';

	/** @type {string} What is the value of this input field? */
	export let value = '';

	/** @type {string} What is the error message of this input field? */
	export let error = '';

	let onInput = (event) => {
		value = event.target.value;
	};
</script>

<form>
	<label for={name}>{label}</label>
	<input {type} id={name} {name} {value} on:input={onInput} />
	<small>{error}</small>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	label {
	}

	input {
		height: 32px;
		border: none;
		border-bottom: 1px solid #ccc;
	}

	input:focus {
		outline: none;
		border-color: var(--secondary);
	}

	small {
		color: var(--danger);
		margin-top: 4px;
	}
</style>
