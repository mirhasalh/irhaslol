import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$icons: 'src/lib/icons',
			$l10n: 'src/lib/l10n'
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
