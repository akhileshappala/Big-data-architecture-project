import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DonarService } from './donar.service';

@Component({
  selector: 'app-donar-screen',
  templateUrl: './donar-screen.component.html',
  styleUrls: ['./donar-screen.component.css']
})
export class DonarScreenComponent implements OnInit {
  
  constructor(private route: Router, private donar: DonarService, private authService: AuthService){}
  donorEmail = this.authService.email;

  ngOnInit(): void {
    console.log("Came into donor component");
    
    this.donar.getUserFood().subscribe(response=>{
      this.items = response

    });
    console.log("Printing items::=>",this.items);
    
  }


  user: any = ""

  items: any;

  giveFood(){
    this.route.navigate(['/upload']);
  }

  removeFood(name: any){
    this.items = this.items.filter((obj: { foodName: string; }) => obj.foodName != name);
  }

}
