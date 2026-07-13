import { categories } from "./categories";


export const serviceCategories =
categories.filter(
(item)=>
item.type==="service"
);