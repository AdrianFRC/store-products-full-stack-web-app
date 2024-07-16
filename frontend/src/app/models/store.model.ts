import { Product } from "./product.model";
export class Store {
    
        id?: string;
        name?: string;
        image?: string;
        address?: string;
        phoneNumber?: string;
        products?: Product[];
     
}
