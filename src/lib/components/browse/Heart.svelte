<script lang="ts">
    import Auth from "$lib/utils/auth"

    export let party

    // The delay exists because of Firebase auth. This is used instead of onMount beacuse
    // onMount is called inconsistently.
    $: setTimeout(() => {
        if (party.numHearts > 0) party.liked = party.hearts.includes(Auth.getId() ?? "")
    }, 250)

    async function toggle() {
        party.liked = !party.liked

        const url = `https://api2.blockparties.io/parties/${party._id}/` + (party.liked ? "heart" : "unheart")

        console.log(url)
        const request = await fetch(url, {
            method: "POST",
            headers: { Authorization: await Auth.getToken() },
        })
        console.log(request.status)

        party.numHearts += party.liked ? 1 : -1
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
