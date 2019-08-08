import { writable, get } from 'svelte/store';

let movies = [{
    id: 'Citizen Kane',
    watched: false
}];

export const store = writable({movies});

store.subscribe(({movies: updatedMovies}) => movies = updatedMovies);

export function newMovie (movie = '') {
    const { movies } = get(store);
    let index = -1;
    let id = movie.trim();

    if (id && !movies.find(item => item.id === id)) {
        updateMovies({
            movies: [...movies, {
                id,
                watched: false
            }]
        });
        index = movies.length + 1;
    }

    return index;
}

export function removeMovie (id) {
    movies.splice(movies.findIndex(movie => movie.id === id), 1);
    updateMovies({
        movies,
    });
}

export function toggleWatch (movieId) {
    const movie = movies.find(item => item.id === movieId);
    if (movie) {
        movie.watched = !movie.watched;
        updateMovies({
            movies,
        });
    }
}

function updateMovies ({movies}) {
    store.set({movies});
}
