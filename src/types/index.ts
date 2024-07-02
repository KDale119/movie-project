export type actors = {
    id: number,
    dateOfBirth: string,
    firstName: string,
    lastName: string
}
export type directors = {
    id: number,
    dateOfBirth: string,
    firstName: string,
    lastName: string
}
export type movies = {
    id: number,
    movieLength: number,
    movieTitle: string,
    releaseDate: string,
    trailerUrl: string,
    rating: {
        id: number,
        description: string,
        rating: string
    },
    genre: {
        id: number,
        genre: string
    },
    director: {
        id: number,
        dateOfBirth: string,
        firstName: string,
        lastName: string
    },
    actors: [
        {
            id: number,
            dateOfBirth: string,
            firstName: string,
            lastName: string
        },
    ],
    overview: string
}
