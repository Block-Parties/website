<script lang="ts">
    export let text
</script>

<button on:click>{text}</button>

<style lang="scss">
    button {
        flex: 1;

        height: 40px;

        background: #0352af;
        border-radius: 4px;
        border: none;

        color: white;
        font-weight: 600;
    }
</style>
