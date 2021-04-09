<!-- <script context="module" lang="ts" ✂prettier:content✂="CiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZCh7IHBhZ2UsIGZldGNoLCBzZXNzaW9uLCBjb250ZXh0IH0pIHsKICAgICAgICAvLyBsZXQgcGFydGllcyA9IGF3YWl0IEFwaS5QYXJ0aWVzLmdldFBhcnRpZXMoKQoKICAgICAgICByZXR1cm4gewogICAgICAgICAgICBwcm9wczogewogICAgICAgICAgICAgICAgcGFydGllczogcGFydGllcywKICAgICAgICAgICAgfSwKICAgICAgICB9CiAgICB9Cg==" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script> -->
<script lang="ts">
    // import Api from "$lib/api/parties"
    import PartyCard from "$lib/components/PartyCard.svelte"
    import { onMount } from "svelte"

    let parties = []

    onMount(async () => {
        let p = await (await fetch("http://3.143.138.224:8000/parties")).json()
        p = p.slice(0, 5)

        let tokenPairs = p.map((item) => [item.tokenContract, item.tokenId])
        console.log(tokenPairs)

        let searchParams = new URLSearchParams({})
        tokenPairs.forEach((item) => {
            if (item[0] != undefined && item[1] != undefined) {
                searchParams.append("asset_contract_addresses", item[0])
                searchParams.append("token_ids", item[1])
            }
        })

        console.log(searchParams.toString())

        // return await res.json()

        const response = await (await fetch("https://api.opensea.io/api/v1/assets?" + searchParams)).json()
        const assets = response["assets"]
        console.log(assets)

        parties = p.map((p, i) => {
            p = { ...p, asset: assets[i] }
            return p
        })

        console.log(parties)

        // parties = await Promise.all(
        //     p.map(async (party) => {
        //         const res = await fetch(
        //             "https://api.opensea.io/api/v1/assets?" +
        //                 new URLSearchParams({
        //                     token_ids: party.tokenId,
        //                     asset_contract_address: party.tokenContract,
        //                 })
        //         )
        //         const assets = (await res.json())["assets"]
        //         console.log(assets)

        //         if (assets == undefined) return undefined

        //         party = { ...party, asset: assets[0] }
        //         return party
        //     })
        // )
    })
</script>

<svelte:head>
    <title>Block Parties | Directory</title>
    <meta name="og:title" content="Block Parties | Directory" />
    <meta name="og:description" content="Find a party to invest in digital assets with." />
</svelte:head>

<div class="outer">
    <div class="sidebar">
        <h1>Party Directory</h1>

        <p>Investing is done best when effort, knowledge, and resources are effectively pooled together.</p>
        <br />
        <p>
            To get started, look for clubs with similar interests as you and a risk tolerance you're comfortable with.
        </p>
    </div>

    <main>
        {#each parties as party}
            <div>
                <PartyCard {party} />
            </div>
        {/each}
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
