<script>
	import Button from '../../components/atoms/Button.svelte';
	import HorizontalMargin from '../../components/atoms/HorizontalMargin.svelte';
	import FlashCard from '../../components/molecules/FlashCard.svelte';
	import InputField from '../../components/atoms/InputField.svelte';
	import CheckBox from '../../components/atoms/CheckBox.svelte';
	import DeckCard from '../../components/molecules/DeckCard.svelte';
</script>

<div>
	<Button type="secondary" label="Study" />
	<HorizontalMargin type="medium" />
	<InputField type="text" name="name" label="Name" error="This is an error" />
	<FlashCard
		side="front"
		frontLine1="Front Line 1"
		frontLine2="Front Line 2 Front line 2 front line 2 front line 2 front line 2"
		hasImage="true"
		imageSrc="https://via.placeholder.com/150"
	/>

	<FlashCard
		side="back"
		backLine1="Front Line 1"
		backLine2="Front Line 2 Front line 2 front line 2 front line 2 front line 2"
		hasImage={true}
		imageSrc="https://via.placeholder.com/150"
	/>
	<DeckCard type="create" />
</div>
