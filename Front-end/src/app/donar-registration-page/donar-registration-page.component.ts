import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const userAPIURL = environment.userAPIURL;
const donorApiUrl = environment.donorAPIURL;
@Component({
  selector: 'app-donar-registration-page',
  templateUrl: './donar-registration-page.component.html',
  styleUrls: ['./donar-registration-page.component.css']
})
export class DonarRegistrationPageComponent implements OnInit {

  registerForm: FormGroup;

  user: any;
  notAUser: boolean = true;
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router){};

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'phonenumber': new FormControl(null, Validators.required),
      'website': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'pincode': new FormControl(null, Validators.required),
    });


  }

  onSubmit(){
      this.isLoading = true;
      this.user = {
        'name': this.registerForm.get('name')?.value,
        'email': this.registerForm.get('email')?.value,
        'password':this.registerForm.get('password')?.value,
        'phonenumber': this.registerForm.get('phonenumber')?.value,
        'website': this.registerForm.get('website')?.value,
        'address': this.registerForm.get('address')?.value,
        'pincode': this.registerForm.get('pincode')?.value
      };

      console.log("Registering donar->");
        const formData = new FormData();
        formData.append('emailId',this.user.email || '');
        formData.append('password', this.user.password || '');
        formData.append('phoneNumber',this.user.phonenumber || '');
        formData.append('website', this.user.website || '');
        formData.append('address', this.user.address|| '');
        formData.append('pincode', this.user.pincode|| '');

        return this.http.post(
            donorApiUrl + '/donor/createDonor',
            formData
        ).subscribe(
          (      responseData: { hasOwnProperty: (arg0: string) => any; })=>{
              console.log("Came here respo");
              console.log(responseData);
              if(responseData.hasOwnProperty('status')){
                  console.log("registered");
                  this.notAUser = false;
                  this.isLoading = false;
                  this.router.navigate(['/login'])

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

  }


}
