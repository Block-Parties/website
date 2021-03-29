<script>
    import ClubCard from "$lib/components/ClubCard.svelte"
</script>

<div class="outer">
    <div class="sidebar">
        <h1>Club Directory</h1>

        <p>Investing is done best when effort, knowledge, and resources are effectively pooled together.</p>
        <br />
        <p>
            To get started, look for clubs with similar interests as you and a risk tolerance you're comfortable with.
        </p>
    </div>

    <main>
        <div>
            <ClubCard />
        </div>
        <div>
            <ClubCard />
        </div>
        <div>
            <ClubCard />
        </div>
        <div>
            <ClubCard />
        </div>
        <div>
            <ClubCard />
        </div>
        <div>
            <ClubCard />
        </div>
    </main>
</div>

<style lang="scss">
    :global(body) {
        margin: 0;
        background: #0c0218;
    }

    .outer {
        display: flex;
    }

    .sidebar {
        position: sticky;
        align-self: flex-start;
        z-index: 99;
        top: 56px;
        height: calc(100vh - 2 * 60px); // I'm not sure why but this seems to be pixel perfect
        left: 0;
        bottom: 0;
        min-width: 280px;

        background: #1b0a30;
        padding: 32px 16px;

        h1 {
            margin-bottom: 16px;
        }

        p {
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;

            color: #eeeeee;
        }
    }

    main {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        padding: 32px;

        div {
            padding: 24px 16px;
        }
    }
</style>
