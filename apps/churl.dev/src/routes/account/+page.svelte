<script lang="ts">
    import { Button } from "bits-ui";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

{#if data.email}
    <span class="mb-4">
        hi {data.email}
    </span>
{:else}
    <Button.Root
        href={`/v1/authorization/init`}
        class="rounded-lg bg-muted text-foreground shadow-mini hover:bg-dark/95 inline-flex
	h-12 items-center justify-end px-4 text-lg
	font-medium active:scale-[0.98] active:transition-all cursor-pointer text-nowrap"
    >
        Sign in with GitHub
    </Button.Root>
{/if}
