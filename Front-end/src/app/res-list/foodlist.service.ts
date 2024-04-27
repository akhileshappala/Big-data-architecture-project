import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class foodList {

    constructor(private http: HttpClient){}

    private foodsr :any = [
        {
            foodId: 123,
            emailId: "gautam@gc.com",
            foodName: "chicken",
            updated_on: 25/12/2022,
            description: "this is good food",
            address: "1855 Athens street",
            pincode: "80032",
            isVeg: 0,
            isNutsFree: 0,
            isGlutenFree: 0,
            isDairyFree: 0,
            quantity: 100
        },
        {
            foodId: 234,
            emailId: "gautam@gc.com",
            foodName: "butter",
            updated_on: 25/12/2022,
            description: "this is good food",
            address: "1855 Athens street",
            pincode: "80032",
            isVeg: 1,
            isNutsFree: 0,
            isGlutenFree: 1,
            isDairyFree: 1,
            quantity: 100
        },
        {
            foodId: 456,
            emailId: "gautam@gc.com",
            foodName: "Rice",
            updated_on: 25/12/2022,
            description: "this is good food",
            address: "1855 Athens street",
            pincode: "80032",
            isVeg: 1,
            isNutsFree: 1,
            isGlutenFree: 0,
            isDairyFree: 0,
            quantity: 100
        }
      ];

    getList(){
        console.log("getting food...")
        return this.http.get('http://34.16.11.211:80/user/listFoodItems')
        // return this.foodsr.slice();
    }

}
