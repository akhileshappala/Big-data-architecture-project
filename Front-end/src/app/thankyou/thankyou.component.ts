import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cartList } from './../cart-list/cartList.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent {
  foodAddedToCart:any;

  constructor(private route: Router,private cart: cartList, private authService:AuthService){
  }
  ngOnInit(): void {
    console.log("Hello world cart-list.component");
    this.foodAddedToCart = this.cart.getCart();
    console.log(this.foodAddedToCart);
  }
  goToHome(){
    this.route.navigate(["/"]);
  }
  goToItems(){
    this.route.navigate(["/foodList"]);
  }
}
