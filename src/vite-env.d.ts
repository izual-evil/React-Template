// src/vite-env.d.ts
// 需要用到环境变量就可以直接使用 import.meta.env.VITE_APP_BASE_URL等
interface ImportMetaEnv {
	readonly VITE_APP_BASE_URL: string;
	readonly VITE_APP_API_PREFIX: string;
	readonly VITE_APP_API_URL: string;
	readonly VITE_APP_WEB_TITLE: string;
	readonly VITE_APP_VERSION: string;
	readonly VITE_APP_COPYRIGHT: string;
	// 更多环境变量...
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface AnyForm {
    [key: string]: any;
}

