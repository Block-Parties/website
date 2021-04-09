<script lang="ts">
    // TODO: OBTAIN UPDATED SOMEHOW
    let conversionRate = 2080

    export let value
</script>

<div class="outer">
    <input type="text" bind:value placeholder="Amount (in ETH)" />
    <p>≈ ${value * conversionRate}</p>
</div>

<style lang="scss">
    .outer {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    input {
        background: rgba(15, 15, 15, 0.5);
        border-radius: 4px;
        border: none;

        height: 24px;

        padding: 8px 16px;
    }

    p {
        font-weight: 600;
    }
</style>
