<script lang="ts">
    import { VERCEL_PROJECT_PRODUCTION_URL } from "$app/env/public";
    import {
        CalendarDateTime,
        getLocalTimeZone,
        now,
        toCalendarDateTime,
        today,
        toLocalTimeZone,
    } from "@internationalized/date";
    import { Button, DateField, Label } from "bits-ui";
    import LanguageSwitch from "#lib/components/LanguageSwitch.svelte";
    import ThemeToggle from "#lib/components/ThemeToggle.svelte";
    import { m } from "#lib/paraglide/messages.js";
    import { getLocale } from "#lib/paraglide/runtime.js";

    let url = $state("");
    let expire = $state(new CalendarDateTime(2077, 1, 1, 0, 0));

    async function oncreate() {
        const response = await fetch("/urls", {
            method: "POST",
            body: JSON.stringify({ destination: url, expires_at: expire.toDate(getLocalTimeZone()) }),
            headers: { "content-type": "application/json" },
        });

        if (!response.ok) {
            url = response.statusText;
            return;
        }

        const json = await response.json();
        url = VERCEL_PROJECT_PRODUCTION_URL + "/" + json.id;
    }
</script>

<div class="flex w-104 items-end space-x-2">
    <div class="flex w-full flex-col space-y-1.25">
        <Label.Root class="ml-0.75 text-base text-foreground/80">{m.enter_url()}</Label.Root>
        <input
            bind:value={url}
            type="text"
            placeholder="https://git.kernel.org/torvalds/h/v7.3"
            class="h-12 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-xl font-medium transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30"
        />
    </div>

    <Button.Root
        onclick={async () => await oncreate()}
        class="shadow-mini hover:bg-dark/95 inline-flex h-12 cursor-pointer items-center
	justify-end rounded-lg bg-muted px-4 text-lg
	font-semibold text-nowrap text-foreground active:scale-[0.98] active:transition-all"
    >
        {m.create()}
    </Button.Root>
</div>

<DateField.Root locale={getLocale()} bind:value={expire} granularity="minute">
    <DateField.Input
        class="-mt-1 flex h-9 w-104 items-center rounded-md border border-input bg-input/20 px-2 py-1 text-sm tracking-[0.01em] text-foreground shadow-xs select-none focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 hover:border-ring data-invalid:border-destructive"
    >
        {#snippet children({ segments })}
            {#each segments as { part, value }, i (part + i)}
                <div class="inline-block select-none">
                    {#if part === "literal"}
                        <DateField.Segment {part} class="p-1 text-muted-foreground">
                            {value}
                        </DateField.Segment>
                    {:else}
                        <DateField.Segment
                            {part}
                            class="rounded-sm px-1 py-1 hover:bg-accent focus:bg-accent focus:text-accent-foreground focus-visible:ring-0! focus-visible:ring-offset-0! aria-[valuetext=Empty]:text-muted-foreground data-invalid:text-destructive"
                        >
                            {value}
                        </DateField.Segment>
                    {/if}
                </div>
            {/each}
        {/snippet}
    </DateField.Input>
</DateField.Root>

<div class="flex h-10 w-104 items-center space-x-2">
    <ThemeToggle />
    <LanguageSwitch />
    <span class="ml-2">{m.made_in()}</span>
    <img class="mt-0.75 size-4" src="/flags/eu.avif" alt="eu flag" />
</div>
