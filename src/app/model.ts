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

}
export interface MetaData{
    total:number
}
export interface APIResponse <T>{
    events: T[];
    meta: MetaData

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

}