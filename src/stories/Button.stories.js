import Button from './Button.svelte';

export default {
	title: 'Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'danger']
		}
	}
};

export const Primary = {
	args: {
		type: 'primary',
		label: 'Button'
	}
};

export const Secondary = {
	args: {
		type: 'secondary',
		label: 'Button'
	}
};

export const Danger = {
	args: {
		type: 'danger',
		label: 'Button'
	}
};
