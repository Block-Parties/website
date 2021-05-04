<script lang="ts">
    import Heart from "$lib/components/browse/Heart.svelte"
    import { onMount } from "svelte"
    // import Heart from  Heart.svelte"

    let party

    onMount(async () => {
        const localData = JSON.parse(localStorage.getItem("party"))
        console.log(localData)

        // TODO: COMPARE URL PARTY WITH SAVED PARTY.

        party = localData
    })
</script>

{#if party}
    <div class="header">
        <h4>View</h4>
        <h1>Party Page</h1>
    </div>

    <div class="content">
        <div class="card">
            <img src={party.asset.image_preview_url} alt="nft" />
            <div class="footer">
                <img
                    on:click={() => open(party.url, "blank")}
                    class="opensea-logo"
                    src="images/opensea-logo.webp"
                    alt="view on opensea"
                />
                <Heart {party} />
                <p>Share</p>
            </div>
        </div>

        <div class="info">
            <a href="/browse">BACK</a>

            <h2>{party.asset.name}</h2>
            <h4>{party.asset.collection.name}</h4>

            <div class="data-detail">
                <h5>RESALE PRICE</h5>
                <div>
                    <p>4 ETH | <span>$123</span></p>
                </div>
            </div>

            <div class="data-detail">
                <h5>ORIGINAL PRICE</h5>
                <div>
                    <p>4 ETH | <span>$123</span></p>
                </div>
            </div>

            <hr />

            <h5>DESCRIPTION</h5>
            <p>{party.asset.description ? party.asset.description : "No description available."}</p>
        </div>
    </div>
{/if}

<style lang="scss">
    .header {
        max-width: 1200px;
        margin: auto;

        h4 {
            color: #646464;
            font-weight: 500;
            font-family: Montserrat sans-serif;
        }
    }

    .content {
        display: flex;
        padding: 32px;
        max-width: 1200px;
        margin: auto;
    }

    .card {
        flex: 3;
        background: white;
        padding: 32px;
        margin-right: 32px;

        img {
            width: 100%;
            object-fit: contain;
        }

        .opensea-logo {
            cursor: pointer;
            width: 36px;
            height: 36px;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            margin: 16px 0;
        }
    }

    .info {
        flex: 2;

        h2 {
            font-size: 32px;
            margin: 32px 0 12px 0;
        }

        h4 {
            font-weight: 400;
            font-family: Montserrat sans-serif;
            color: #1f204177;
            margin-bottom: 32px;
        }

        h5 {
            margin: 0 0 6px 0;
            color: #1f204188;
            font-weight: 800;
            font-family: Montserrat sans-serif;
        }

        p {
            font-family: Montserrat sans-serif;
            font-weight: 200;
            color: #1f204177;
        }

        .data-detail {
            margin-bottom: 32px;
        }
    }
</style>
