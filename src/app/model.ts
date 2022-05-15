export interface Event{
    title: string;
    description: string;
    type: string;
    score: string;
    url: string;
    datetime_utc: string;
    id: string;
    announce_date:string;
    performers: Array<Performer>

}
export interface MetaData{
    total:number
}
export interface APIResponse <T>{
    events: T[];
    meta: MetaData

}
export interface Venue{
    city: string;
    name: string;
}
export interface Performer{
    name: string;
    score: number;
    image: string;

}