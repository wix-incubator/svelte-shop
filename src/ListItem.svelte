<script>
    import { createEventDispatcher } from 'svelte';
    import HiddenIcon from './HiddenIcon.svelte';
    import VisibleIcon from './VisibleIcon.svelte';
    import XIcon from './XIcon.svelte';
    export let name = '';
    export let seen = false;
    const dispatcher = createEventDispatcher();

    function onRemove () {
        dispatcher('remove', {movie: name});
    }

    function onToggleVisibility () {
        dispatcher('visibility', {movie: name});
    }
</script>

<div class="wrapper">
    {name}
    <div class="icons">
        <div class="icon" on:click={onToggleVisibility}>
            {#if seen}
                <HiddenIcon></HiddenIcon>
            {:else}
                <VisibleIcon></VisibleIcon>
            {/if}
        </div>
        <div class="icon" on:click={onRemove}><XIcon></XIcon></div>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .icons {
        opacity: 0;
        display: flex;
    }

    .icon {
        cursor: pointer;
    }

    .wrapper:hover .icons {
        opacity: 1;
    }
</style>
