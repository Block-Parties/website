<nav>
    <h1>NAV BAR</h1>
</nav>

<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<slot />

<style lang="scss">
    nav {
        position: sticky;
        top: 0;
        z-index: 99;

        width: 100%;
        height: 56px;
        // background: #371164;
        background: #231845;
    }
</style>
