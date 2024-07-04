export interface Movie {
    name: string;
    additional: string;
    description: string;
    genre: number;
    id: number,
    image: string;
}

export interface Shows {
    showdate: string,
    daytime: string
}


export interface Ticket {
    id: number;
    date: string;
    time: string;
    row: number;
    seat: number;
}

export interface Tickets {
    id: number;
    date: string;
    time: string;
    row: number;
    seat: number;
    showdate: string;
    daytime: string;
    ticketkey: string;
}

export interface SidebarItem {
    route_path: string;
    title: string;
    count?: Tickets;
}
