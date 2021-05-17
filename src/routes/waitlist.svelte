<script lang="ts">
    import { onMount } from "svelte"
    import PartyCard from "$lib/components/browse/PartyCard.svelte"
    import Dropdown from "$lib/components/common/Dropdown.svelte"

    let parties = []
    let searchTerm: string
    let sortBy: string = "createdAt"

    $: search(searchTerm)

    onMount(async () => {
        parties = await getAssets("sort_by=createdAt")
    })

    async function getAssets(params: string = "") {
        return await (await fetch(`https://api2.blockparties.io/parties?${params}`)).json()
    }

    async function search(term: string) {
        parties = await getAssets(
            new URLSearchParams({
                sort_by: sortBy,
                search: searchTerm,
            }).toString()
        )
    }

    async function sort(method: string) {
        parties = []

        switch (method) {
            case "FEATURED":
                parties = await getAssets("featured=true")
                break

            case "POPULAR":
                sortBy = "hearts"
                parties = await getAssets("sort_by=hearts")
                break

            case "NEWEST":
                sortBy = "createdAt"
                parties = await getAssets("sort_by=createdAt")
                break
        }
    }
</script>

<!-- <div class="spot mid-left" />
<div class="spot bottom-right" /> -->

<div>
    <div>
        <div class="header">
            <h1>Browse Waitlist</h1>

            <div>
                <div class="controls">
                    <Dropdown
                        prefix={"Sort By "}
                        options={["FEATURED", "POPULAR", "NEWEST"]}
                        onSelect={sort}
                        selection="Newest"
                    />
                    <input bind:value={searchTerm} placeholder="Search" />
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
        width: 100%;

        margin-top: 36px;

        .card {
            margin: 0 32px 64px 32px;
        }
    }

    .controls {
        display: flex;
        align-items: center;

        input {
            margin-left: 32px;
        }
    }
</style>
