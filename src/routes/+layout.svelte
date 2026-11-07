<script lang="ts">
    import "@fontsource-variable/geist-pixel";
    import "./layout.css";
    import { dev } from "$app/env";
    import { injectAnalytics } from "#lib/analytics/index.svelte.ts";
    import favicon from "#lib/assets/favicon.svg";
    import { m } from "#lib/paraglide/messages.js";
    import { localizeHref } from "#lib/paraglide/runtime.js";
    import { theme } from "#lib/state/theme.svelte.ts";
    import type { LayoutProps } from "./$types";

    let { children }: LayoutProps = $props();

    $effect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme.current);
    });

    injectAnalytics({
        mode: dev ? "development" : "production",
        beforeSend: (event) => {
            if (localStorage.getItem("va") === "0") {
                return null;
            }

            return event;
        },
    });
</script>

<svelte:head>
    <title>churl - oss url shortener</title>
    <meta name="description" content="create short and user-friendly urls with churl." />
    <link rel="icon" href={favicon} />
    <script>
        try {
            const theme = localStorage.getItem("sv:theme");

            document.documentElement.classList.add(
                !theme || theme === "system"
                    ? window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "light"
                    : theme,
            );
        } catch {}
    </script>
</svelte:head>

<main class="flex h-screen flex-col items-center justify-center space-y-3">
    {@render children()}

    <hr class="my-1 h-px w-104 shrink-0 text-border" />

    <div class="mt-3 flex space-x-5 text-muted-foreground">
        <a href={localizeHref("/")}>[{m["footer.home"]()}]</a>
        <a href={localizeHref("/privacy")}>[{m["footer.privacy"]()}]</a>
        <a href="https://github.com/vdkenny/churl" target="_blank">[{m["footer.source_code"]()}]</a>
    </div>

    <a href="https://github.com/vdkenny" target="_blank" class="text-muted-foreground">{m["footer.by"]()} @vdkenny</a>
</main>
