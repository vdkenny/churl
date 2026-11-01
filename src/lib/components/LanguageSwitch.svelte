<script lang="ts">
    import { Button, DropdownMenu } from "bits-ui";
    import { getLocale, locales, setLocale } from "#lib/paraglide/runtime.js";

    const localeMappings = {
        en: "English",
        es: "Español",
        de: "Deutsch",
        fr: "Français",
        ja: "日本語",
    };
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger
        aria-label="Language switch dropdown"
        class="shadow-mini hover:bg-dark/95 inline-flex size-10 items-center justify-center rounded-md border
	border-border bg-muted/35 px-2 text-base text-foreground
	active:scale-[0.98] active:transition-all"
    >
        <img class="size-[1.35rem]" src="/flags/{getLocale()}.avif" alt="Current language: {getLocale()}" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
        <DropdownMenu.Content
            class="z-50 w-32 rounded-md border border-muted bg-background px-1 py-1.5 shadow-popover outline-hidden focus-visible:outline-hidden"
            sideOffset={8}
        >
            {#each locales as locale}
                <DropdownMenu.Item
                    class="flex h-8 items-center rounded-sm px-1.5 py-2 text-sm font-medium ring-0! ring-transparent! select-none focus-visible:outline-none data-highlighted:bg-muted"
                >
                    <Button.Root class="flex items-center space-x-1.5" onclick={() => setLocale(locale)}>
                        <img class="size-4" src="/flags/{locale}.avif" alt={locale} />
                        <span>{localeMappings[locale]}</span>
                    </Button.Root>
                </DropdownMenu.Item>
            {/each}
        </DropdownMenu.Content>
    </DropdownMenu.Portal>
</DropdownMenu.Root>
