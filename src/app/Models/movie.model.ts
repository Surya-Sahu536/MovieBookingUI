export class Movie{
    id: string | undefined;
    key: MovieTheaterKey | undefined;
    noOfTicketsAlloted: number | undefined;
    noOfTicketsRemaining: number | undefined;
    ticketStatus: string | undefined;
}

export class MovieTheaterKey{
    movieName: string | undefined;
    theaterName: string | undefined;
}