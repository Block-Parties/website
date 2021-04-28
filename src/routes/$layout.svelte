<nav>
    <div class="page-row">
        <h3>Home</h3>
        <h3>Profile</h3>
    </div>

    <img src="images/dark_mode.svg" alt="toggle dark mode" />
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

        display: flex;
        justify-content: space-between;
        // max-width: 1200px;
        margin: 32px;

        width: calc(100% - 64px);
        height: 56px;

        .page-row {
            display: flex;

            h3 {
                cursor: pointer;
                color: black;
                margin-right: 32px;
                font-weight: 300;
            }
        }

        img {
            cursor: pointer;
        }
    }
</style>
