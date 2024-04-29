import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isUserNameNull: boolean = false;
  isPasswordNull: boolean = false;
  isConfirmPassword: boolean = false;
  isEmailNull: boolean = false;
  isPhoneNumber: boolean = false;
  passwordDontMatch: boolean = false;
  registered: boolean = false;
  alreadyExists: boolean = false;
  isLoading: boolean = false;


  constructor(private authService: AuthService, private route: Router){}

  ngOnInit(): void {
    

    this.registerForm = new FormGroup({
      'username' : new FormControl(null, Validators.required),
      'user_password': new FormControl(null, Validators.required),
      'user_email': new FormControl(null, [Validators.required, Validators.email]),
      'confirmPassword': new FormControl(null),
      'phone_number': new FormControl(null)
    });

    console.log(this.authService.getAccountType());

    // this.registerForm.valueChanges.subscribe(
    //   (value)=>console.log(value)
    // );
  }


  async onSubmit(){
    this.registered = false;
    this.alreadyExists = false;
    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('user_password').value;
    const confirmPassword = this.registerForm.get('confirmPassword').value;
    const email = this.registerForm.get('user_email').value;
    const phoneNumber = this.registerForm.get('phone_number').value;
    console.log("Submitted!");
    console.log("Printing details:",{username: username,password:password,confirmPassword:confirmPassword,email:email,phoneNumber:phoneNumber});

    if(username == null || password == null || confirmPassword == null || email==null || phoneNumber == null){
      if(username == null){
        this.isUserNameNull = true;
      }
      if(password == null){
        this.isPasswordNull = true;
      }
      if(confirmPassword == null){
        this.isConfirmPassword = true;
      }
      if(email == null){
        this.isEmailNull = true;
      }
      if(phoneNumber == null){
        this.isPhoneNumber = true;
      }
      
    }else if(password != confirmPassword){
      this.passwordDontMatch = true;
      this.isUserNameNull = false;
      this.isPasswordNull = false;
      this.isConfirmPassword = false;
      this.isEmailNull = false;
      this.isPhoneNumber = false;

    }else{
      console.log("calling register...");
      
      this.passwordDontMatch = false;
      this.isUserNameNull = false;
      this.isPasswordNull = false;
      this.isConfirmPassword = false;
      this.isEmailNull = false;
      this.isPhoneNumber = false;
      console.log(this.registerForm);
      console.log(this.registerForm.get('user_email').valid);
  
      console.log(this.registerForm.get('user_password').value);

      this.authService.register({username: username,
                                 password:password,
                                 confirmPassword:confirmPassword,
                                 email:email,
                                 phoneNumber:phoneNumber}).subscribe(
    (      responseData: { hasOwnProperty: (arg0: string) => any; })=>{
        console.log("Came here respo");
        console.log(responseData);
        if(responseData.hasOwnProperty('status')){
            console.log("registered");
            this.registered = true;
            this.isLoading = false;
            
        }else if(responseData.hasOwnProperty('Error')){
            this.isLoading = false;
            console.log("Account already exists");
            this.alreadyExists = true;
            
        }
    },
    (      err: any)=>{
            console.log("Came here");
            console.log("Error",err);
        }
    );
  
    }
    
    // if(this.authService.getAccountType() == "donor"){
    //   this.route.navigate(['/upload'])
    // }else{
    //   this.route.navigate(['/foodList'])
    // }

    // this.registerForm.reset();
    // if(this.registerForm.get('username') != null){
    //   console.log(this.registerForm.get('username').valid)
    // }
    
  }

  // forbiddenEmails(control: FormControl): Promise<any>|Observable<any>{
  //   const promise = New Promise<any>((resolve, reject)=>{
  //     setTimeout(()=>{

  //     }, 1500);
  //   });
  //   return promise;
  // }

}
