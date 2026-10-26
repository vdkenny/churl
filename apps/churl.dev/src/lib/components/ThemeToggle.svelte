<script lang="ts">
    // credits: https://github.com/sveltejs/svelte.dev/blob/main/packages/site-kit/src/lib/components/ThemeToggle.svelte
    import { theme } from "../state";
    import { Moon } from "@lucide/svelte";

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

<!-- <button onclick={toggle} type="button" aria-pressed={theme.current === "dark"} aria-label="Toggle dark mode">
    <Moon />
</button> -->
