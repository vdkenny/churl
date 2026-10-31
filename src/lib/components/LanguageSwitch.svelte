<script lang="ts">
    import { locales, getLocale, setLocale } from "#lib/paraglide/runtime.js";
    import { Button, DropdownMenu } from "bits-ui";

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
        class="rounded-md bg-muted/35 border border-border text-foreground shadow-mini hover:bg-dark/95 inline-flex
	size-10 items-center justify-center px-2 text-base
	active:scale-[0.98] active:transition-all"
    >
        <img class="size-[1.35rem]" src="/flags/{getLocale()}.avif" alt="Current language: {getLocale()}" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
        <DropdownMenu.Content
            class="border-muted bg-background shadow-popover outline-hidden focus-visible:outline-hidden z-50 w-32 rounded-md border px-1 py-1.5"
            sideOffset={8}
        >
            {#each locales as locale}
                <DropdownMenu.Item
                    class="rounded-sm data-highlighted:bg-muted ring-0! ring-transparent! flex h-8 select-none items-center py-2 px-1.5 text-sm font-medium focus-visible:outline-none"
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
