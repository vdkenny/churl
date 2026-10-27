<script lang="ts">
    import LanguageSwitch from "#lib/components/LanguageSwitch.svelte";
    import ThemeToggle from "#lib/components/ThemeToggle.svelte";
    import { Button, Label, Separator } from "bits-ui";
</script>

<main class="h-screen flex flex-col space-y-3 items-center justify-center">
    <div class="flex space-x-2 w-96 items-end">
        <div class="flex flex-col space-y-1.25 w-full">
            <Label.Root class="text-base text-foreground/80 ml-0.75">enter ur cutie-long url</Label.Root>
            <input
                type="text"
                placeholder="https://kernel.org/long-url"
                class="h-12 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-xl transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30 font-medium"
            />
        </div>

        <Button.Root
            class="rounded-lg bg-muted text-foreground shadow-mini hover:bg-dark/95 inline-flex
	h-12 items-center justify-end px-4 text-xl
	font-semibold active:scale-[0.98] active:transition-all cursor-pointer"
        >
            create
        </Button.Root>
    </div>

    <div class="flex w-96 h-10">
        <ThemeToggle />
        <LanguageSwitch />
    </div>

    <!-- <Separator.Root class="bg-border my-4 shrink-0 h-px w-64" /> -->
</main>
