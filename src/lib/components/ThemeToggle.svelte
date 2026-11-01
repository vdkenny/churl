<script lang="ts">
    /// credits: https://github.com/sveltejs/svelte.dev/blob/main/packages/site-kit/src/lib/components/ThemeToggle.svelte
    import { Moon, Sun } from "@lucide/svelte";
    import { Button } from "bits-ui";
    import { theme } from "../state";

    function toggle() {
        theme.current = theme.current === "light" ? "dark" : "light";
    }
</script>

<Button.Root
    onclick={toggle}
    aria-pressed={theme.current === "dark"}
    aria-label="Toggle dark mode"
    class="shadow-mini hover:bg-dark/95 inline-flex size-10 items-center justify-center rounded-md
	border border-border bg-muted/35 px-2 text-base text-foreground
	active:scale-[0.98] active:transition-all"
>
    <Moon class="absolute size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
    <Sun class="size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
</Button.Root>
