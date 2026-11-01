<script lang="ts">
    import { m } from "#lib/paraglide/messages.js";
    import { Button } from "bits-ui";
</script>

<section class="max-w-104 w-full px-4 flex flex-col space-y-2">
    <div class="justify-center flex flex-col items-center">
        <span class="text-center text-xs text-muted-foreground/40 mb-2">
            {m["privacy.disclaimer"]()}
        </span>
        <h1 class="text-xl">{m["privacy.title"]()}</h1>
    </div>

    <div class="text-muted-foreground flex flex-col space-y-5">
        <span>{m["privacy.last_update"]()}</span>

        <div>
            <h3 class="text-foreground text-lg">{m["privacy.who.title"]()}</h3>
            <span>{m["privacy.who.text"]()}</span>
        </div>

        <span>{m["privacy.contacts"]()} vdkenny@proton.me</span>

        <div class="flex flex-col">
            <h3 class="text-foreground text-lg">{m["privacy.processed.title"]()}</h3>

            <span class="mb-1.5">{m["privacy.processed.data"]()}</span>
            <span class="mb-1.5">{m["privacy.processed.purpose"]()}</span>
            <span>{m["privacy.processed.legal_basis"]()}</span>

            <span class="mt-6">{m["privacy.processed.storage"]()}</span>
        </div>

        <div>
            <h3 class="text-foreground text-lg">{m["privacy.retention.title"]()}</h3>
            <span
                >{m["privacy.retention.before"]()}<a class="text-foreground/80" href="https://vercel.com/privacy"
                    >{m["privacy.retention.link"]()}</a
                >{m["privacy.retention.after"]()}</span
            >
        </div>

        <div>
            <h3 class="text-foreground text-lg">{m["privacy.rights.title"]()}</h3>
            <span>{m["privacy.rights.text"]()}</span>
        </div>
    </div>

    <Button.Root class="cursor-pointer">{m["privacy.opt_out"]()}</Button.Root>
</section>
