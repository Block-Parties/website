<script lang="ts">
    import { onMount } from "svelte"
    import PartyCard from "$lib/components/browse/PartyCard.svelte"

    let parties = []
    let searchTerm: string

    $: search(searchTerm)

    onMount(async () => {
        let p = await (await fetch("https://api2.blockparties.io/parties")).json()
        let tokenPairs = p.map((item) => [item.tokenContract, item.tokenId])

        let searchParams = new URLSearchParams({})
        tokenPairs.forEach((item) => {
            if (item[0] != undefined && item[1] != undefined) {
                searchParams.append("asset_contract_addresses", item[0])
                searchParams.append("token_ids", item[1])
            }
        })

        const response = await (await fetch("https://api.opensea.io/api/v1/assets?" + searchParams)).json()
        const assets: any[] = response["assets"]
        console.log(assets)

        parties = p
            .map((p) => {
                p = {
                    ...p,
                    asset: assets.find(
                        (asset) => p.tokenId == asset.token_id && p.tokenContract == asset.asset_contract["address"]
                    ),
                }
                return p
            })
            .filter((p) => p.asset != null)
    })

    async function search(term: string) {
        console.log(term)
    }
</script>

<!-- <div class="spot mid-left" />
<div class="spot bottom-right" /> -->

<div>
    <div>
        <div class="header">
            <h1>Browse Waitlist</h1>

            <div>
                <!-- <h3>Search</h3> -->
                <div>
                    <input bind:value={searchTerm} placeholder="Search" />
                    <!-- <select>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="waitlist">Waitlist</option>
                    </select> -->
                </div>
            </div>
        </div>

        <div class="card-grid">
            {#each parties as party}
                <div class="card">
                    <PartyCard {party} />
                </div>
            {/each}
        </div>
    </div>

    <!-- <div class="scrollbar">
        <Scrollbar container={cardRow} />
    </div> -->
</div>

<style lang="scss">
    .spot {
        z-index: -1;
        width: 25vw;
        height: 25vw;

        background: linear-gradient(
            134.27deg,
            rgba(115, 230, 237, 0.26) 5.56%,
            rgba(53, 22, 242, 0.26) 49.74%,
            rgba(119, 47, 210, 0.26) 93.01%
        );
        filter: blur(56px);
        border-radius: 332px;
    }

    .mid-left {
        position: absolute;
        left: -5%;
        top: 20%;
    }

    .bottom-right {
        position: absolute;
        right: 15%;
        bottom: 10%;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 2vh auto;
        padding: 0 32px;

        h1 {
            color: #161412;
            font-weight: 300;
        }

        h3 {
            color: #252b42;
        }

        input,
        select {
            height: 40px;
            background: #f9f9f9;
            border: 1px solid #e6e6e6;
            box-sizing: border-box;
            border-radius: 20px;

            color: black;
            padding: 16px 24px;
            margin-left: 16px;

            // color:
            &:focus {
                outline: none;
            }
        }

        select {
            padding: 0 24px;

            position: relative;
            top: -2px;
        }

        ::placeholder {
            color: #737373;
        }
    }

    .card-grid {
        display: flex;
        flex-flow: row wrap;
        overflow-x: scroll;
        width: 100%;

        margin-top: 36px;

        .card {
            margin: 0 32px 64px 32px;
        }
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .scrollbar {
        margin: auto;
        margin-top: 48px;
    }
</style>
