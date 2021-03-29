<script lang="ts">
    import { onMount } from "svelte"

    export let text: string
    export let color

    let tag

    onMount(() => {
        console.log(tag)
        tag.style.background = color
    })
</script>

<div bind:this={tag} class="outer">
    <p>{text}</p>
</div>

<style lang="scss">
    .outer {
        border-radius: 16px;
        inline-size: fit-content;

        p {
            margin: 0;
            padding: 4px 16px;
            display: inline-block;
            
            font-weight: 600;
            font-size: 12px;
        }
    }
</style>
