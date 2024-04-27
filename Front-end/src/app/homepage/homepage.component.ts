import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private router: Router, private authService: AuthService){}

  callLoginUser(){
    this.authService.setAccountType("user");
    this.router.navigate(['login']);
  }

  callLoginProvider(){
    this.authService.setAccountType("donor");
    this.router.navigate(['login']);
  }

}
