<script lang="ts">
    export let dismiss: () => void
</script>

<div on:click={dismiss}>
    <slot />
</div>

<style lang="scss">
    div {
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        background: #000000aa;
    }
</style>
