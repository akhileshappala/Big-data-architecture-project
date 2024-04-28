import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { cartList } from './cartList.service';
import { environment } from 'src/environments/environment';
const userAPIURL = environment.userAPIURL;
const donorApiUrl = environment.donorAPIURL;

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private totalCart: cartList, private authService:AuthService, private http:HttpClient, private route: Router){}

  foodAddedToCart:any;

  order: { [x: string]: any; };

  ngOnInit(): void {
    console.log("Hello world cart-list.component");
    this.foodAddedToCart = this.totalCart.getCart();
    console.log(this.foodAddedToCart);
  }


  removeFromCart(food: any){
    this.foodAddedToCart = this.totalCart.removeFromCart(food.food.foodId);
  }

  checkout(){

    console.log("came here");
    this.isLoading =  true;

    const myOrder: {[x:string]:string} = {};

    for(var proj in this.foodAddedToCart){
      console.log(this.foodAddedToCart[proj]);
      myOrder[this.foodAddedToCart[proj].food.foodId] = this.foodAddedToCart[proj].quantity;

    }



    this.order = {
      'itemCart': myOrder,
      'emailId' : this.authService.email
    };

    console.log(this.authService.email);

    const formData = new FormData();
    formData.append('itemCart',JSON.stringify(myOrder));
    formData.append('emailId',this.authService.email);

    this.http.post(userAPIURL + '/user/orderCartItems',formData).subscribe(response=>{
      console.log(response);
      if(response.hasOwnProperty('status')){
        console.log("checking out...");
        this.isLoading = false;
        this.foodAddedToCart.splice(0);
        this.route.navigate(['/thankyou'])

    }else if(response.hasOwnProperty('Error')){
        this.isLoading = false;
        alert(response);
        console.log("No account found");
        this.foodAddedToCart.splice(0);
        this.route.navigate(['/foodList'])
    }

    });

    this.foodAddedToCart = [];









  }

  // @Input() foodAddedToCart:any;

}
