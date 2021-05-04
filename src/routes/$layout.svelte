<script lang="ts">
    import Auth from "$lib/utils/auth"
    import { onMount } from "svelte"

    onMount(() => {
        Auth.init()
    })
</script>

<nav>
    <div class="logo">
        <img src="images/logo_black.svg" alt="logo" />
        <h4>Block Parties</h4>
    </div>

    <div class="page-row">
        <h3 on:click={() => (location.href = "/")}>HOME</h3>
        <!-- <h3 on:click={() => (location.href = "/browse")}>Browse</h3> -->
        <h3 on:click={() => (location.href = "/browse")}>WAITLIST</h3>
        <!-- <h3 on:click={() => (location.href = "/profile")}>Profile</h3> -->
        <!-- <h3>Profile</h3> -->
    </div>

    <!-- <img src="images/dark_mode.svg" alt="toggle dark mode" /> -->
</nav>

<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<slot />

<footer>
    <p>copyright blockparties 2021</p>

    <div class="row">
        <p>get in touch</p>
        <img src="images/discord.png" alt="discord" />
        <img src="images/twitter.png" alt="twitter" />
    </div>
</footer>

<style lang="scss">
    :global(html) {
        // min-height: 100vh;
    }

    :global(body) {
        margin: 0;
        background: #eeeef0;
        min-height: 100vh;

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

    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #2c2c2c;
        padding: 24px 48px;

        p {
            color: white;
        }

        img {
            margin-left: 16px;
        }
    }
</style>
