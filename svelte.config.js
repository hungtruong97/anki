import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

		alias: {
			src: '/src',
			'src/*': 'src/*',
			static: '/static',
			'static/*': 'static/*'
		},
		adapter: adapter({
			pages: '.svelte-kit/output',
			assets: '.svelte-kit/output',
			fallback: 'index.html',
			precompress: true,
			strict: true
		})
	}
};

export default config;
