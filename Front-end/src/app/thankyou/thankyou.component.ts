import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent {

  constructor(private route: Router){
    
  }

  goToHome(){
    this.route.navigate(["/"]);
  }
  

}
