<script lang="ts">
    import Heart from "$lib/components/browse/Heart.svelte"
    import ProgressBar from "$lib/components/ProgressBar.svelte"
    import { onMount } from "svelte"

    let party

    let investmentAmount
    let eth

    onMount(async () => {
        const id = location.href.split("/").reverse()[0]

        party = await (await fetch(`https://api2.blockparties.io/parties/${id}`)).json()

        let url = `api.opensea.io/api/v1/asset/${party.tokenContract}/${party.tokenId}`
        if (party.network == "rinkeby") {
            url = "rinkeby-" + url
        }

        url = "https://" + url
        console.log(url)
        party.asset = await (await fetch(url)).json()

        const module = await import("$lib/api/eth")
        eth = module.EthHelper
    })

    async function invest() {
        eth.invest(party._id, investmentAmount)
    }
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

            {#if party.onChain}
                <div class="progress-bar">
                    <ProgressBar {party} />
                </div>

                <div class="invest-container">
                    <input bind:value={investmentAmount} placeholder="0.0 ETH" />
                    <button on:click={invest}>Invest</button>
                </div>
            {/if}

            <hr />

            <h5>DESCRIPTION</h5>
            <p class="description">{party.asset.description ? party.asset.description : "No description available."}</p>
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

        .description {
            font-size: 12px;
        }

        .data-detail {
            margin-bottom: 32px;

            span {
                color: black;
            }
        }
    }

    .progress-bar {
        width: 248px;
        margin-bottom: 16px;
    }

    .invest-container {
        margin-bottom: 16px;

        input {
            padding: 6px;
            border-radius: 4px 0 0 4px;
            border: 2px solid rgb(158, 158, 158);
        }

        button {
            margin-left: -8px;
            background: #6838d0;
            border: none;
            border-radius: 0 4px 4px 0;

            color: white;
            font-weight: 600;
            padding: 8px 24px;
        }
    }
</style>
