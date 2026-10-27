<script lang="ts">
    import { DropdownMenu } from "bits-ui";

    const values = ["one", "two", "three"];
    let value = $state("one");
</script>

<DropdownMenu.RadioGroup bind:value>
    <DropdownMenu.GroupHeading>Favorite number</DropdownMenu.GroupHeading>
    {#each values as value}
        <DropdownMenu.RadioItem {value}>
            {#snippet children({ checked })}
                {#if checked}
                    ✅
                {/if}
                {value}
            {/snippet}
        </DropdownMenu.RadioItem>
    {/each}
</DropdownMenu.RadioGroup>
