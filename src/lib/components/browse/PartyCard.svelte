<script lang="ts">
    import { BigNumber } from "@ethersproject/bignumber"
    import { onMount, stop_propagation } from "svelte/internal"

    import ProgressBar from "../ProgressBar.svelte"
    import Heart from "./Heart.svelte"

    export let party

    let eth

    function show() {
        localStorage.setItem("party", JSON.stringify(party))
        location.href = `/parties/${party._id}`
    }

    onMount(async () => {
        const module = await import("$lib/api/eth")
        eth = module.EthHelper
    })
</script>

<div class="outer" on:click={show}>
    <div class="img-container">
        <img src={party.asset.image_preview_url} alt="asset" />
    </div>
    <div class="details">
        <div class="title-row">
            <div>
                <p class="title"><b>{party.asset.name ? party.asset.name : "Unnamed Asset"}</b></p>
                <p class="collection">{party.asset.collection.name}</p>
                <p />
                <!-- <p class="type">{party.asset.description ? party.asset.description : "No description available."}</p> -->
            </div>
            <img
                on:click={(event) => {
                    open(party.url, "blank")
                    event.stopPropagation()
                }}
                class="opensea-logo"
                src="/images/opensea-logo.webp"
                alt="view on opensea"
            />
        </div>

        <!-- <div class="progress-bar">
            <ProgressBar value={BigNumber.from(60)} total={BigNumber.from(100)} />
        </div>
        <p><b>0.15 ETH</b> <span class="usd-amount">| $400.12</span></p> -->
    </div>

    <div class="bottom-row">
        <div class="data-detail">
            <h5>RESALE PRICE</h5>
            <div>
                {#if eth}
                    <p><span>{eth.utils.formatEther(party.resalePrice)} ETH</span> <!-- | $123 --></p>
                {/if}
            </div>
        </div>

        <Heart {party} />
    </div>
</div>

<style lang="scss">
    $purple: #6838d0;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        color: black;
    }

    .outer {
        cursor: pointer;
        transition: 0.5s all;

        position: relative;
        width: 272px;
        height: 380px;

        background: white;
        padding: 32px;

        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);

        &:hover {
            transform: scale(1.05);
        }
    }

    .details {
        .title-row {
            display: flex;
            justify-content: space-between;

            .title {
                font-size: 20px;
            }

            .collection {
                color: #1f204177;
                font-weight: 500;
                font-size: 16px;
            }

            .opensea-logo {
                cursor: pointer;
                width: 36px;
                height: 36px;
            }
        }

        .usd-amount {
            color: #65635f;
            font-weight: 300;
        }

        .progress-bar {
            margin: 12px 0 4px 0;
        }
    }

    .img-container {
        height: 65%;
        padding: 16px 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .bottom-row {
        position: absolute;
        bottom: 24px;
        left: 32px;
        right: 36px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        h5 {
            margin: 0 0 0 0;
            color: #1f204188;
            font-weight: 700;
            font-size: 12px;
            font-family: "Montserrat", sans-serif;
        }

        p {
            font-weight: 200;
            font-size: 16px;
            color: #1f204188;
        }
    }
</style>
