<script lang="ts">
    import Auth from "$lib/utils/auth"
    import { onMount } from "svelte"

    onMount(() => {
        Auth.init()
    })
</script>

<nav>
    <div class="logo" on:click={() => (location.href = "/")}>
        <img src="/images/logo_black.svg" alt="logo" />
        <h4>Block Parties</h4>
    </div>

    <div class="page-row">
        <h3 on:click={() => (location.href = "/")}>HOME</h3>
        <!-- <h3 on:click={() => (location.href = "/browse")}>Browse</h3> -->
        <h3 on:click={() => (location.href = "/browse")}>WAITLIST</h3>
        <!-- <h3 on:click={() => (location.href = "/profile")}>Profile</h3> -->
        <!-- <h3>Profile</h3> -->
    </div>

    <!-- <img src="/images/dark_mode.svg" alt="toggle dark mode" /> -->
</nav>

<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="content">
    <slot />
</div>

<footer>
    <p>copyright blockparties 2021</p>

    <div>
        <p>get in touch</p>
        <a href="https://discord.gg/MG73GUKDyW"><img src="/images/discord.svg" alt="discord" /></a>
        <a href="https://twitter.com/block_parties"><img src="/images/twitter.svg" alt="twitter" /></a>
    </div>
</footer>

<style lang="scss">
    :global(html) {
        margin: 0;
        // height: 100%;
    }

    :global(body) {
        margin: 0;
        // height: 100%;
        background: #eeeef0;
        // min-height: 100vh;

        // position: relative;
    }

    nav {
        // position: sticky;
        // top: 0;
        // z-index: 99;

        display: flex;
        justify-content: space-between;
        align-items: center;
        // max-width: 1200px;
        margin: 32px;

        width: calc(100% - 64px);

        .logo {
            display: flex;
            align-items: center;

            img {
                cursor: pointer;
                width: 80px;
            }

            h4 {
                color: black;
            }
        }

        .page-row {
            display: flex;

            h3 {
                cursor: pointer;
                color: black;
                margin-right: 32px;
                font-weight: 300;
            }
        }
    }

    .content {
        // min-height: 100%;

        min-height: calc(100vh - 196px);
    }

    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #2c2c2c;
        padding: 24px 48px;

        // position: sticky;
        // bottom: 0;
        // left: 0;
        // right: 0;

        p {
            color: white;
        }

        img {
            margin-left: 16px;
        }

        div {
            display: flex;
            align-items: center;
        }
    }
</style>
