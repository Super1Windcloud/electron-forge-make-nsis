import type { SignOptions } from "@electron/windows-sign" with {
	"resolution-mode": "import"
};

export type CodesignOptions = Omit<SignOptions, "appDirectory">;

export interface MakerNSISConfig {
	codesign?: CodesignOptions;
	updater?: {
		url: string;
		channel?: string;
		updaterCacheDirName?: string;
		publisherName?: string;
	};
	getAppBuilderConfig?: () => Promise<Record<string, any>>;
}
