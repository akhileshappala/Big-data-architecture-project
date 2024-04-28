import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { foodList } from '../res-list/foodlist.service';

@Injectable({
  providedIn: 'root'
})
export class DonarService {



  food: any;

  constructor(private foodlist : foodList, private authService: AuthService) { }

  getUserFood(){
    return this.foodlist.getList();

  }

  deleteFood(name: string){
    this.food = this.food.filter((obj: { foodName: string; }) => obj.foodName != name);
    return this.food;

  }

}
