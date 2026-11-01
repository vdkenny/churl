// @vercel/analytics upstream does not support SvelteKit 3; see https://github.com/vercel/analytics/pull/204
import { page } from "$app/state";
import { inject, pageview } from "@vercel/analytics";
import type { AnalyticsProps } from "@vercel/analytics";

function getBasePath(): string | undefined {
    try {
        return import.meta.env.VITE_VERCEL_OBSERVABILITY_BASEPATH;
    } catch {
        // do nothing
    }
}

function getConfigString(): string | undefined {
    try {
        return import.meta.env.VITE_VERCEL_OBSERVABILITY_CLIENT_CONFIG;
    } catch {
        // do nothing
    }
}

export function injectAnalytics(props: Omit<AnalyticsProps, "framework"> = {}): void {
    let analyticsInjected = false;

    $effect.root(() => {
        $effect.pre(() => {
            const route = page.route?.id;

            if (!route) {
                return;
            }

            if (!analyticsInjected) {
                inject(
                    {
                        ...props,
                        basePath: getBasePath(),
                        disableAutoTrack: true,
                        framework: "sveltekit",
                    },
                    getConfigString(),
                );
                analyticsInjected = true;
            }

            pageview({ route, path: page.url.pathname });
        });
    });
}
