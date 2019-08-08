import { writable, get } from 'svelte/store';

let movies = [{
    id: 'Citizen Kane',
    watched: false
}];

export const store = writable({movies});


export function newMovie (movie) {
    const { movies } = get(store);
    if (!movies.find(item => item.id === movie)) {
        updateMovies({
            movies: [...movies, {
                id: movie,
                watched: false
            }]
        });
    }
}

export function markAsWatched (movie) {
    toggleWatch(movie, true);
}

export function markAsUnWatched (movie) {
    toggleWatch(movie, false);
}

export function removeMovie (id) {
    movies.splice(movies.findIndex(movie => movie.id === id), 1);
    updateMovies({
        movies,
    });
}

function toggleWatch (movie, watched) {
    movies.filter(item => item.id === movie).watched = watched;
    updateMovies({
        movies,
    });
}

function updateMovies ({movies}) {
    store.set({movies});
}
