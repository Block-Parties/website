<script lang="ts">
    export let container: HTMLElement

    let innerBar: HTMLDivElement

    // Bind only once we're sure container is not undefined
    $: {
        if (container != null) {
            container.onscroll = update
            innerBar.style.width = (100 * container.clientWidth) / container.scrollWidth + "%"
        }
    }

    function update() {
        innerBar.style.left = (100 * container.scrollLeft) / container.scrollWidth + "%"
    }
</script>

<div class="outer">
    <div bind:this={innerBar} class="inner" />
</div>

<style lang="scss">
    .outer {
        margin: auto;

        background: rgba(49, 58, 52, 0.26);
        height: 6px;
        width: max(20vw, 256px);
    }

    .inner {
        position: relative;
        height: 100%;
        background: #313a34;
    }
</style>
