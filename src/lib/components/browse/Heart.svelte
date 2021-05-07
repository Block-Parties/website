<script lang="ts">
    import Auth from "$lib/utils/auth"
    import { onMount } from "svelte"

    export let party

    // The delay exists because of Firebase auth. This is used instead of onMount beacuse
    // onMount is called inconsistently.
    // $: setTimeout(() => {
    //     if (party.numHearts > 0) {
    //         console.log(party.hearts)
    //         liked = party.hearts.includes(Auth.getId() ?? "")
    //         party.liked = liked
    //     }
    // }, 250)

    // $: {
    //     console.log(party.liked)
    //     party.liked = party.hearts.includes(Auth.getId())
    // }

    onMount(() => {
        console.log("MONT")
        setTimeout(() => {
            party.liked = party.hearts.includes(Auth.getId() ?? "")
        }, 300)
    })

    async function toggle() {
        party.liked = !party.liked
        party.numHearts += party.liked ? 1 : -1

        const url = `https://api2.blockparties.io/parties/${party._id}/` + (party.liked ? "heart" : "unheart")

        await fetch(url, {
            method: "POST",
            headers: { Authorization: await Auth.getToken() },
        })
    }
</script>

<div
    on:click={(event) => {
        toggle()
        event.stopPropagation()
    }}
>
    <img
        src={party.liked ? "/images/heart_filled.svg" : "/images/heart_outline.svg"}
        alt={party.liked ? "unlike" : "like"}
    />
    <p>{party.numHearts}</p>
</div>

<style lang="scss">
    div {
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    img {
        width: 28px;
        height: 28px;

        margin-right: 8px;
    }

    p {
        color: black;
        font-weight: 600;
        font-size: 18px;
    }
</style>
