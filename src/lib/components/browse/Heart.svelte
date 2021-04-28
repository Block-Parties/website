<script lang="ts">
    export let partyId: string

    let liked = false
    let likes = 0

    function toggle() {
        liked = !liked
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
