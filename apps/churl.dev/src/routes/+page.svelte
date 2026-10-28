<script lang="ts">
    import LanguageSwitch from "#lib/components/LanguageSwitch.svelte";
    import ThemeToggle from "#lib/components/ThemeToggle.svelte";
    import { Button, Label, Separator } from "bits-ui";
    import { m } from "#lib/paraglide/messages.js";

    let url = $state("");
    let response = $state({
        ok: true,
        message: "",
    });
    let timer: NodeJS.Timeout;

    async function create() {
        const res = await fetch("http://localhost:3000/v1/urls", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ destination: url }),
        });

        const json = await res.json();
        response = {
            ok: res.ok,
            message: res.ok ? m.creation_success() : json.message,
        };

        if (res.ok) {
            url = "http://localhost:3000/v1/urls/" + json.id;
        }

        clearTimeout(timer);
        timer = setTimeout(() => {
            response = { ok: true, message: "" };
        }, 5_000);
    }
</script>

<span class="absolute top-32 {response.ok ? 'text-green-500' : 'text-destructive'}">{response.message}</span>

<div class="flex space-x-2 w-96 items-end">
    <div class="flex flex-col space-y-1.25 w-full">
        <Label.Root class="text-base text-foreground/80 ml-0.75">{m.enter_url()}</Label.Root>
        <input
            bind:value={url}
            type="text"
            placeholder="https://git.kernel.org/torvalds/h/v7.3"
            class="h-12 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-xl transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30 font-medium"
        />
    </div>

    <Button.Root
        onclick={create}
        class="rounded-lg bg-muted text-foreground shadow-mini hover:bg-dark/95 inline-flex
	h-12 items-center justify-end px-4 text-lg
	font-semibold active:scale-[0.98] active:transition-all cursor-pointer text-nowrap"
    >
        {m.create()}
    </Button.Root>
</div>

<div class="flex w-96 h-10 space-x-2 items-center">
    <ThemeToggle />
    <LanguageSwitch />
    <Button.Root
        href="/account"
        class="rounded-md bg-muted/35 border border-border shadow-mini hover:bg-dark/95 inline-flex
	h-10 w-20 items-center justify-center text-foreground px-2 text-base
	active:scale-[0.98] active:transition-all"
        >Sign in
    </Button.Root>
    <span class="ml-2">{m.made_in()}</span>
    <img class="size-4 mt-0.75" src="/flags/eu.avif" alt="eu flag" />
</div>
