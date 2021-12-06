/*
 * @Autor: GeekMzy
 * @Date: 2021-12-03 15:35:33
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-03 15:45:40
 * @FilePath: \svelte\my-test-app\svelte.config.js
 */
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		vite: {
			ssr: {
				noExternal: ["three"]
			}
		},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
