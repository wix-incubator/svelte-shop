import { writable } from 'svelte/store';

const INITIAL_STORE = {
    watched: [],
    unwatched: ['Citizen Kane'],
};

export const store = writable(INITIAL_STORE);
