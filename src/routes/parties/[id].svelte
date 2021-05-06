<script lang="ts">
    import Heart from "$lib/components/browse/Heart.svelte"
    import { onMount } from "svelte"

    let party

    let eth

    onMount(async () => {
        const localData = JSON.parse(localStorage.getItem("party"))
        console.log(localData)

        // TODO: COMPARE URL PARTY WITH SAVED PARTY.

        party = localData

        const module = await import("$lib/api/eth")
        eth = module.EthHelper
    })
</script>

{#if party}
    <div class="header">
        <h4>View</h4>
        <h1>Party Page</h1>
    </div>

    <div class="content">
        <div class="card-wrapper">
            <div class="card">
                <img
                    src={party.asset.image_original_url
                        ? party.asset.image_original_url
                        : party.asset.image_preview_url}
                    alt="nft"
                />
                <div class="footer">
                    <img
                        on:click={() => open(party.url, "blank")}
                        class="opensea-logo"
                        src="/images/opensea-logo.webp"
                        alt="view on opensea"
                    />
                    <Heart {party} />
                </div>
            </div>
        </div>

        <div class="info">
            <a href="/browse">🠔 BACK</a>

            <h2>{party.asset.name}</h2>
            <h4>{party.asset.collection.name}</h4>

            {#if eth}
                <div class="data-detail">
                    <h5>RESALE PRICE</h5>
                    <div>
                        <p><span>{eth.utils.formatEther(party.resalePrice)} ETH</span> <!-- | $123 --></p>
                    </div>
                </div>

                <div class="data-detail">
                    <h5>ORIGINAL PRICE</h5>
                    <div>
                        <p><span>{eth.utils.formatEther(party.buyPrice)} ETH</span> <!-- | $123 --></p>
                    </div>
                </div>
            {/if}

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
        padding: 32px;

        h4 {
            color: #646464;
            font-weight: 600;
            font-family: "Montserrat", sans-serif;
            font-size: 16px;
        }
    }

    .content {
        display: flex;
        padding: 32px;
        max-width: 1200px;
        margin: auto;
    }

    .card-wrapper {
        flex: 3;
        margin-right: 32px;

        .card {
            width: fit-content;
            margin: auto;
            background: white;
            padding: 32px;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06);

            img {
                // width: 100%;
                max-height: 480px;
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
    }

    .info {
        flex: 2;

        a {
            color: black;
            text-decoration: none;
        }

        h2 {
            font-size: 32px;
            margin: 32px 0 12px 0;
        }

        h4 {
            font-weight: 400;
            font-family: "Montserrat", sans-serif;
            color: #1f204177;
            margin-bottom: 32px;
        }

        h5 {
            margin: 0 0 6px 0;
            color: #1f204188;
            font-weight: 700;
            font-family: "Montserrat", sans-serif;
        }

        p {
            font-family: "Montserrat", sans-serif;
            font-weight: 400;
            color: #1f204177;
        }

        .data-detail {
            margin-bottom: 32px;

            span {
                color: black;
            }
        }
    }
</style>
