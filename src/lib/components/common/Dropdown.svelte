<script lang="ts">
    import { onMount } from "svelte"

    export let prefix: string
    export let selection: string
    export let options: string[]
    export let onSelect: (string) => void

    let expanded = false

    function select(s: string) {
        expanded = false
        selection = s

        onSelect(s)
    }

    onMount(() => {
        if (selection == null) selection = options[0]
    })
</script>

<div class="outer">
    <div class="label" on:click={() => (expanded = true)}>
        <p>{prefix}<span class="selected-text">{selection}</span></p>
    </div>

    <div class="dropdown" style="opacity: {expanded ? '1' : '0'}">
        {#if options}
            {#each options as option}
                <div class="cell" on:click={() => select(option)}>
                    <p>{option}</p>
                </div>
            {/each}
        {/if}
    </div>
</div>

<style lang="scss">
    .outer {
        position: relative;
        z-index: 10;
    }

    .label {
        cursor: pointer;
    }

    .selected-text {
        font-weight: 600;
    }

    .dropdown {
        transition: 0.5s all;
        position: absolute;
        overflow: hidden;
        margin-top: 8px;

        display: flex;
        flex-direction: column;

        background: linear-gradient(134.47deg, #ffffff 230.72%, #d1d1d1 230.75%);
        box-shadow: 2px 8px 24px rgba(0, 0, 0, 0.16), inset 0px 2px 0px #ffffff;
        border-radius: 8px;

        // padding: 8px;

        .cell {
            transition: 0.5s all;
            cursor: pointer;
            flex: 1;
            padding: 12px 32px;

            &:hover {
                background: #00000016;
            }
        }
    }
</style>
