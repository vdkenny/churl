<script lang="ts">
    import "./layout.css";
    import favicon from "#lib/assets/favicon.svg";
    import type { LayoutProps } from "./$types";
    import ThemeToggle from "#lib/components/ThemeToggle.svelte";

    let { children }: LayoutProps = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<ThemeToggle />
