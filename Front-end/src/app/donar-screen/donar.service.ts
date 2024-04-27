import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { foodList } from '../res-list/foodlist.service';

@Injectable({
  providedIn: 'root'
})
export class DonarService {

  // food: any[] = [
  //   {name: "Food 1"},
  //   {name: "Food 2"},
  //   {name: "Food 3"},
  //   {name: "Food 4"},
  //   {name: "Food 5"}
  // ];

  food: any;

  constructor(private foodlist : foodList, private authService: AuthService) { }

  getUserFood(){
    

    return this.foodlist.getList();
    // console.log("Recieved food",this.gotFood);
    
    // console.log("printing email:", this.authService.email);
    
    // this.food = this.gotFood.filter((food: { emailId: string; })=> food.emailId ==  this.authService.email);
    // console.log("Called user food");
    // console.log("checkout=>",this.food);
    
    
    // return this.food;
  }

  deleteFood(name: string){
    this.food = this.food.filter((obj: { foodName: string; }) => obj.foodName != name);
    return this.food;

  }

}
