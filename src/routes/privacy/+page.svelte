<script lang="ts">
    import { browser } from "$app/env";
    import { Button } from "bits-ui";
    import { m } from "#lib/paraglide/messages.js";

    let analytics = $state(browser && localStorage.getItem("va") === "1");

    $effect(() => {
        try {
            localStorage.setItem("va", analytics ? "1" : "0");
        } catch {}
    });

    function toggleAnalytics() {
        analytics = !analytics;
    }
</script>

<section class="flex w-full max-w-104 flex-col space-y-2 px-4">
    <div class="flex flex-col items-center justify-center">
        <span class="mb-2 text-center text-xs text-muted-foreground/40">
            {m["privacy.disclaimer"]()}
        </span>
        <h1 class="text-xl">{m["privacy.title"]()}</h1>
    </div>

    <div class="flex flex-col space-y-5 text-muted-foreground">
        <span>{m["privacy.last_update"]()}</span>

        <div>
            <h3 class="text-lg text-foreground">{m["privacy.who.title"]()}</h3>
            <span>{m["privacy.who.text"]()}</span>
        </div>

        <span>{m["privacy.contacts"]()} vdkenny@proton.me</span>

        <div class="flex flex-col">
            <h3 class="text-lg text-foreground">{m["privacy.processed.title"]()}</h3>

            <span class="mb-1.5">{m["privacy.processed.data"]()}</span>
            <span class="mb-1.5">{m["privacy.processed.purpose"]()}</span>
            <span>{m["privacy.processed.legal_basis"]()}</span>

            <span class="mt-6">{m["privacy.processed.storage"]()}</span>
        </div>

        <div>
            <h3 class="text-lg text-foreground">{m["privacy.retention.title"]()}</h3>
            <span
                >{m["privacy.retention.before"]()}<a class="text-foreground/80" href="https://vercel.com/privacy"
                    >{m["privacy.retention.link"]()}</a
                >{m["privacy.retention.after"]()}</span
            >
        </div>

        <div>
            <h3 class="text-lg text-foreground">{m["privacy.rights.title"]()}</h3>
            <span>{m["privacy.rights.text"]()}</span>
        </div>
    </div>

    <Button.Root onclick={toggleAnalytics} class="cursor-pointer"
        >{m["privacy.opt_out"]()} {analytics ? "" : ": x"}</Button.Root
    >
</section>
