<script>
    import { flip } from 'svelte/animate';
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    import ListItem from './ListItem.svelte';
    import { toggleWatch, removeMovie } from './Store';

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(200 * d),
        fallback() {
            return {
                duration: 200,
                easing: quintOut,
                css: t => `
					opacity: ${t};
					transform: scale(${t})
				`
            };
        }
    });

    export let list = [];

    function onToggleVisibility (event) {
        const {movie} = event.detail;
        toggleWatch(movie);
    }

    function onRemove(event) {
        const { movie } = event.detail;
        removeMovie(movie);
    }
</script>

<div class="container">
    <h2>
        <slot name="title"></slot>
    </h2>
    <div class="listwrapper">
        {#if list.length}
            <ul>
                {#each list as movie (movie.id)}
                    <li in:receive="{{key: movie.id}}"
                        out:send="{{key: movie.id}}" animate:flip>
                        <ListItem name={movie.id} on:remove={onRemove} seen={movie.watched} on:visibility={onToggleVisibility}></ListItem>
                    </li>
                {/each}
            </ul>
        {:else}
            <slot name="placeholder"></slot>
        {/if}
    </div>
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

    .listwrapper {
        width: 230px;
        padding: 20px;
        background-color: rgba(207, 208, 231, 0.3);
        border-radius: 3px;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
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
