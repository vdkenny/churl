<script lang="ts">
    // credits: https://github.com/sveltejs/svelte.dev/blob/main/packages/site-kit/src/lib/components/ThemeToggle.svelte
    import { Button } from "bits-ui";
    import { theme } from "../state";

    function toggle() {
        theme.current = theme.current === "light" ? "dark" : "light";
    }

    $effect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme.current);
    });
</script>

<svelte:head>
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

<Button.Root
    onclick={toggle}
    aria-pressed={theme.current === "dark"}
    aria-label="Toggle dark mode"
    class="rounded-md bg-muted text-foreground shadow-mini hover:bg-dark/95 inline-flex
	h-10 items-center justify-center px-3 text-base
	font-semibold active:scale-[0.98] active:transition-all"
>
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="hidden dark:inline">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
            fill="currentColor"
            d="M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56"
        />
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="inline dark:hidden">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
            fill="currentColor"
            d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37a.996.996 0 0 0-1.41 0a.996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41zm1.06-10.96a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36a.996.996 0 0 0 0-1.41a.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z"
        />
    </svg>
</Button.Root>
