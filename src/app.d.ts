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

		interface PrivacyDeclaration {
			title: string
			text: string
		}

		interface MobileAppUrl {
			title: string
			code: string
			show: boolean
			url: string
		}

		interface MobileApp {
			_id: string
			description: string
			effectiveDateOfPrivacy: string
			featureGraphic: string
			icon: string
			privacyDeclarations: PrivacyDeclaration[]
			production: boolean
			shortDescription: string
			slug: string
			title: string
			urls: MobileAppUrl[]
			year: number
		}

		interface Work {
			_id: string
			_createdAt: string
			title: string
			description: string
			imgFileName: string
			year: number
			urls: string[]
		}
	}
}

export {};
