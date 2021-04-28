<script lang="ts">
    import PartyCard from "$lib/components/browse/PartyCard.svelte"
    import Scrollbar from "$lib/components/common/Scrollbar.svelte"

    let cardRow: HTMLElement
</script>

<div class="spot mid-left" />
<div class="spot bottom-right" />

<div>
    <div>
        <div class="header">
            <h1>Browse Parties</h1>

            <div>
                <!-- <h3>Search</h3> -->
                <div>
                    <input placeholder="Search" />
                    <select>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="waitlist">Waitlist</option>
                    </select>
                </div>
            </div>
        </div>

        <div bind:this={cardRow} class="card-row">
            {#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as _}
                <div class="card">
                    <PartyCard />
                </div>
            {/each}
        </div>
    </div>

    <div class="scrollbar">
        <Scrollbar container={cardRow} />
    </div>
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

    .card-row {
        display: flex;
        width: 100%;
        overflow-x: scroll;

        .card {
            margin: 0 32px;
        }
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .scrollbar {
        margin: auto;
        margin-top: 64px;
    }
</style>
