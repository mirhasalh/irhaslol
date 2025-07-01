// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface Post {
			title: string
			excerpt: string
			category: string
			tags: string[]
			publishedAt: string
			slug: string
			body: string
			readingTime: number
		}

		interface AppUrl {
			id: number
			title: string
			code: string
			url: string
			show: boolean
		}
	}
}

export {};
