import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class cartList{
    // private cart: any = [
    //     { name: 'Roti', address: "1855 Athens south" },
    //     { name: 'Rice', address: "1855 Athens south" }
    // ]

    private cart: any = []

    myObservable: any;

    getCart(){
        return this.cart;
    }

    addToCart(item:any){
        console.log("came to addToCart");
        console.log(item)
        this.cart.push(item);
        // console.log(this.cart);
        // console.log("Added to cart successfully");
    }

    removeFromCart(foodId:any){
        this.cart = this.cart.filter((item: { food: { foodId: any; }; })=>item.food.foodId !== foodId);
        return this.cart;
    }
}
