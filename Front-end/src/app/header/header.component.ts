import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService,private ngZone: NgZone,private cdr: ChangeDetectorRef){}
  user ={
    email:'',
    accountType:'',
  };
  isAuthenticated: boolean = false;
  private subscription: Subscription;
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(userDetails => {
      this.user = userDetails;
    });
    this.subscription = this.authService.getUserName().subscribe((data) => {
      if(data){
        const atIndex = data.indexOf('@');
        if (atIndex !== -1) {
            this.user.accountType = data.accountType;
            this.user.email =  data.substring(0, atIndex);
           
        }
            console.log(this.user? JSON.stringify(this.user.email) : "no email");
          }
      }
    );
    
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  callLoginUser(){
    this.authService.setAccountType("user");
    this.router.navigate(['login']);
  }

  callLoginProvider(){
    this.authService.setAccountType("donor");
    this.router.navigate(['login']);
  }

}
