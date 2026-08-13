export interface Team {

id:number;

name:string;

designation:string;

specialization:string | null;

experience:string | null;

email:string;

phone:string;

image:string | null;

bio:string | null;

status:
"Active" |
"Inactive";

}