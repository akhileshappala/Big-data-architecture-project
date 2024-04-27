import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms'

import { HttpClient } from '@angular/common/http'

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private http: HttpClient){}

  loginForm: FormGroup;

  userType: any;

  notAUser: boolean = false;

  isLoading: boolean = false;

  ngOnInit(): void {
    console.log(this.authService.getAccountType());

    this.userType = this.authService.getAccountType()
    if(this.userType == ''){
      this.router.navigate(['/']);
    }

    this.loginForm = new FormGroup({
      'email' : new FormControl(null, Validators.required),
      'Password': new FormControl(null, Validators.required),
    });
  }

  login(){
    this.isLoading = true;
    console.log("Welcome");
    console.log(this.loginForm.get("email").value);
    console.log(this.loginForm.get("Password").value);
    console.log("came here");
    console.log(this.userType)
    if(this.userType == ''){
      this.router.navigate(['/'])
    }

    this.authService.login(this.loginForm.get("email").value,this.loginForm.get("Password").value).subscribe(
      (responseData: any)=>{
          console.log("Came here respo");
          console.log(responseData);
          if(responseData.hasOwnProperty('Status')){
              console.log("Login");
              this.notAUser = false;
              this.isLoading = false;
              if(this.userType == 'user'){
                this.router.navigate(['/foodList'])
              }
              if(this.userType == 'donor'){
                this.router.navigate(['/display'])
              }

          }else if(responseData.hasOwnProperty('Error')){
              this.isLoading = false;
              console.log("No account found");
              this.notAUser = true;

          }
      },
      (      err: any)=>{
              console.log("Came here");
              console.log("Error",err);
          }
      );

    // if(this.authService.getAccountType() == "donor"){
    //   this.router.navigate(['/display'])
    // }
    // if(this.authService.getAccountType() == "user"){
    //   this.router.navigate(['/foodList'])
    // }
  }

}
