<script lang="ts">
    import "@fontsource-variable/geist-pixel";
    import "./layout.css";
    import favicon from "#lib/assets/favicon.svg";
    import type { LayoutProps } from "./$types";
    import { m } from "#lib/paraglide/messages.js";
    import { Separator } from "bits-ui";
    import { theme } from "#lib/state/theme.svelte.ts";
    import { localizeHref } from "#lib/paraglide/runtime.js";

    let { children }: LayoutProps = $props();

    $effect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme.current);
    });
</script>

<svelte:head>
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

<main class="h-screen flex flex-col space-y-3 items-center justify-center">
    {@render children()}

    <Separator.Root class="bg-border my-1 shrink-0 h-px w-104" />

    <div class="flex space-x-5 mt-3 text-muted-foreground">
        <a href={localizeHref("/")}>[{m["footer.home"]()}]</a>
        <a href={localizeHref("/privacy")}>[{m["footer.privacy"]()}]</a>
        <a href="https://github.com/vdkenny/churl" target="_blank">[{m["footer.source_code"]()}]</a>
    </div>

    <a href="https://github.com/vdkenny" target="_blank" class="text-muted-foreground">{m["footer.by"]()} @vdkenny</a>
</main>
