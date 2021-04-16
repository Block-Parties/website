<script lang="ts">
    import type { BigNumber } from "$lib/api/ethers-5.0.esm.min"

    import { onMount } from "svelte"
    import RoundButton from "./common/RoundButton.svelte"
    import Spacer from "./common/Spacer.svelte"
    import ValueInput from "./common/ValueInput.svelte"
    import ModalPopup from "./ModalPopup.svelte"
    import ProgressBar from "./ProgressBar.svelte"

    export let party

    let showPopup = false
    let eth

    let investmentAmount

    let raisedAmount: BigNumber
    let totalAmount: BigNumber

    onMount(async () => {
        const module = await import("$lib/api/eth")
        eth = module.EthHelper
        console.log(party)

        // Vercel doesn't support websockets...
        // eth.onInvestment((partyId: BigNumber, amount: BigNumber, event) => {
        //     if (partyId.toNumber() == party.id) {
        //         raisedAmount += amount.toNumber() // TODO: this won't work for large numbers
        //         console.log("AMOUNT" + raisedAmount)
        //     }
        // })

        setInterval(async () => {
            raisedAmount = await eth.fetchPartyContributions(party.id)
            console.log("AMOUNT: " + raisedAmount)
        }, 10000)

        raisedAmount = await eth.fetchPartyContributions(party.id)
        raisedAmount = raisedAmount
        totalAmount = party.targetAmount
        console.log("AMOUNT: " + raisedAmount)
    })

    async function invest() {
        // const amt = eth.newBigNumber(investmentAmount * 1e18).toString()
        eth.invest(party.id, investmentAmount)
    }

    function openOpenSea() {
        window.open(party.url, "_blank")
    }
</script>

<!-- SET TO TRUE TO ENABLE -->
<div class="outer" on:click={() => (showPopup = false)}>
    <div class="header">
        <img src={party.asset.image_preview_url} alt="token" />

        <button on:click={openOpenSea}>View on OpenSea</button>
    </div>
    <!-- 
    <div class="progress-bar">
        <div class="progress-bar-fill" bind:this={progressBar} />
    </div> -->

    <!-- TODO: Figure out how to handle bignumbers... -->
    <ProgressBar value={raisedAmount} total={totalAmount} />

    <div class="bottom-half">
        <div class="title-row">
            <h4>{party.asset.name ? party.asset.name : "Unnamed Asset"}</h4>
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
        // cursor: pointer;
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

    .header {
        height: 40%;
        background: #eeeeee;
        border-radius: 4px 4px 0 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        button {
            cursor: pointer;
            transition: 250ms all;
            position: absolute;
            right: 16px;
            top: calc(40% - 52px);

            border: 1px solid rgb(155, 155, 155);
            border-radius: 4px;
            background: rgba(34, 34, 34, 0.6);
            padding: 8px 12px;

            font-weight: 600;

            &:hover {
                background: rgba(20, 98, 170, 1);
            }
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

            width: 100%;
            overflow-y: scroll;
            max-height: 80px;

            margin: 16px 0;
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
