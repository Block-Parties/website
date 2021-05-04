<script lang="ts">
    import Auth from "$lib/utils/auth"
    import { onMount } from "svelte"

    export let party

    let likes
    let liked = false

    onMount(() => {
        likes = party.hearts ? party.hearts.length : 0
        if (likes > 0) liked = party.hearts.includes(Auth.getId() ?? "")
    })

    async function toggle() {
        liked = !liked

        const url = `https://api2.blockparties.io/parties/${party._id}/heart`
        // const url = `http://localhost:8000/parties/${partyId}/heart`

        console.log(url)
        const request = await fetch(url, {
            method: "POST",
            // body: ""
            headers: {
                Authorization: await Auth.getToken(),
            },
        })
        console.log(request.status)

        likes = liked ? likes + 1 : likes - 1
    }
</script>

<div on:click={toggle}>
    <img src={liked ? "images/heart_filled.svg" : "images/heart_outline.svg"} alt={liked ? "unlike" : "like"} />
    <p>{likes}</p>
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
