export interface AllStationsResponse {
   results: Station[];
}
export interface Station{
    id:          string;
    number:      number;
    name:        string;
    coordinates: string;
    capacity:    number;
    bikes:       number;
}