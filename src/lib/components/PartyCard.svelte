<script lang="ts">
    import { onMount } from "svelte"
    import RoundButton from "./common/RoundButton.svelte"
    import Spacer from "./common/Spacer.svelte"
    import ValueInput from "./common/ValueInput.svelte"
    import ModalPopup from "./ModalPopup.svelte"

    export let party

    let showPopup = false
    let eth

    let investmentAmount

    let progressBar: HTMLDivElement

    onMount(async () => {
        const module = await import("$lib/api/eth")
        eth = module.EthHelper
        console.log(party)
        // opensea.
        const raisedAmount = await eth.fetchPartyContributions(party.id)
        console.log("AMOUNT: " + raisedAmount)
        progressBar.style.width = raisedAmount + "%"
    })

    async function invest() {
        eth.invest(party.id, investmentAmount)
    }
</script>

<!-- SET TO TRUE TO ENABLE -->
<div class="outer" on:click={() => (showPopup = false)}>
    <div class="chart">
        <img src={party.asset.image_preview_url} alt="token" />
    </div>

    <div class="progress-bar">
        <div class="progress-bar-fill" bind:this={progressBar} />
    </div>

    <div class="bottom-half">
        <div class="title-row">
            <h4>{party.asset.name}</h4>
            <!-- <Tag text="HIGH" color={"red"} /> -->
        </div>

        <p class="description">{party.asset.description ? party.asset.description : "No description available."}</p>

        <div class="footer">
            <!-- <div>O O O O</div>
            <p>$15k - $50k invested</p> -->

            <ValueInput bind:value={investmentAmount} />
            <Spacer height={"16px"} />

            <div class="row">
                <RoundButton text={"Invest"} on:click={invest} />
                <!-- <RoundButton text={"Withdraw"} /> -->
            </div>
        </div>
    </div>
</div>

{#if showPopup}
    <ModalPopup dismiss={() => (showPopup = false)} />
{/if}

<style lang="scss">
    .outer {
        transition: all 0.25s;
        cursor: pointer;
        position: relative;
        background: blue;
        width: 400px;
        height: 500px;

        border-radius: 4px;
        background: #023b70;
        box-shadow: 0 0 1px 2px #00000066;

        &:hover {
            box-shadow: 0 2px 2px 4px #00000066;
            background: #023b70dd;

            // border: 2px solid white;
        }
    }

    .chart {
        height: 40%;
        background: #eeeeee;
        border-radius: 4px 4px 0 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .progress-bar {
        height: 24px;
        width: 100%;
        background: #161616cc;

        .progress-bar-fill {
            transition: 0.5s all;

            height: 100%;
            width: 0%;
            background: green;
        }
    }

    .bottom-half {
        padding: 16px;

        .title-row {
            display: flex;
            justify-content: space-between;

            h4 {
                color: white;
            }
        }

        .description {
            font-size: 14px;
            font-weight: 300;

            margin: 16px 0;
        }

        .tags {
            display: flex;

            div {
                margin-right: 8px;
            }
        }

        .tags {
            position: absolute;

            bottom: 76px;
        }

        .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            // height: 40px;
            border-radius: 0 0 4px 4px;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // align-items: center;

            padding: 16px 16px;
            background: rgba(0, 0, 0, 0.25);

            p {
                font-weight: 600;
            }
        }
    }
</style>
