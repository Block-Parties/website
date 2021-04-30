<script lang="ts">
    export let partyId: string
    export let likes = 0

    let liked = false

    async function toggle() {
        liked = !liked

        const request = await fetch(`http://3.143.138.224:8000/parties/${partyId}/heart`, {
            method: "POST",
            // body: ""
            headers: {
                Authorization: "Bearer TODO",
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
