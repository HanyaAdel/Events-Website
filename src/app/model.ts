export interface Event{
    title: string;
    description: string;
    type: string;
    score: number;
    url: string;
    datetime_utc: string;
    id: string;
    announce_date:string;
    performers: Array<Performer>
    venue: Venue
    stats:Stats
}

export interface Stats{
    average_price: number
    lowest_price: number
    highest_price: number
}

export interface APIResponse <T>{
    events: T[];
    meta: {
        total:number
    }
}
export interface Venue{
    name: string;
    url: string;
    address: string;
    display_location: string;
}

export interface Performer{
    name: string;
    score: number;
    image: string;
    stats:{
        event_count: number;
    }
    url: string;

}
