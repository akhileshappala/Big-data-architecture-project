import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { cartList } from '../cart-list/cartList.service';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {


  @Input() food: any;

  @Output() foodAdded: any = new EventEmitter();

  quantity: any;
  constructor(private addItem: cartList, public authService:AuthService){}

  ngOnInit(): void {

  }

  addToCart(food:any) {
    console.log(food);
    console.log(this.quantity);
    if(this.quantity === 0 || this.quantity== undefined || this.quantity > food.quantity){
      alert("Please add some quantity less than or equal to available quantity");
    }else{
      this.addItem.addToCart({
        'food': food,
        'quantity': this.quantity
      });
    }

    // this.foodAdded.emit(food);

  }

}


