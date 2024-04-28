import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { foodList } from './foodlist.service';

@Component({
  selector: 'app-res-list',
  templateUrl: './res-list.component.html',
  styleUrls: ['./res-list.component.css']
})
export class ResListComponent implements OnInit {


  foodsr :any;

  constructor( private foodItems: foodList ){}

  ngOnInit(): void {
    this.foodsr = this.foodItems.getList().subscribe(response=>{
      this.foodsr = response;
    });
  }

  addedToCart(food: any){
    // this.foodSelected.emit(food);

  }

}
