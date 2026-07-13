export type CategoryType =
  | "service"
  | "designation";


export interface Category {

  id:number;

  name:string;

  type:CategoryType;

  status:
  | "Active"
  | "Inactive";

}