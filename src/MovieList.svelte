<script>
    export let list = [];
</script>

<div class="container">
    <h2>
        <slot name="title"></slot>
    </h2>
    <ul>
        {#if list.length}
            {#each list as movie}
                <li>
                    <slot item={movie}></slot>
                </li>
            {/each}
        {:else}
            <slot name="placeholder"></slot>
        {/if}
    </ul>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        --placeholderColor: rgb(114, 115, 133);
        padding: 6px;
    }

    h2 {
        padding-bottom: 16px;
        border-bottom: 1px solid var(--placeholderColor);
        margin-bottom: 24px;
    }

    ul {
        width: 230px;
        padding: 20px;
        margin: 0;
        list-style: none;
        background-color: rgba(207, 208, 231, 0.3);
        border-radius: 3px;
    }

    li {
        border: 1px solid rgba(128, 128, 128, 0.55);
        padding: 3px 6px;
        background-color: rgba(207, 208, 231, 0.5);
        border-radius: 5px;
        margin: 6px 0;
    }

    p {
        color: var(--placeholderColor);
    }
</style>
