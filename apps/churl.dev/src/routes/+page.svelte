<script lang="ts">
    let destination = $state("");

    $effect(() => {
        console.log(destination)
    })
</script>

<main class="h-screen flex items-center justify-center">
    <div class="border border-border px-24">
        <input bind:value={destination} type="text" />
    </div>
</main>
