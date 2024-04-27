import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foodApp';

  myfood = [
    { name: 'Roti', address: "1855 Athens south" },
    { name: 'Rice', address: "1855 Athens south" },
    { name: 'Pizza', address: "1855 Athens south" },
    { name: 'Cake', address: "1855 Athens south" }
  ];

  shoppingcart: any = [];

  addToCart(foodAdded: any){
    console.log(foodAdded);
    this.shoppingcart.push(foodAdded);
    console.log(this.shoppingcart);
  }




}
