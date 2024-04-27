import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-uploadscreen',
  templateUrl: './uploadscreen.component.html',
  styleUrls: ['./uploadscreen.component.css']
})
export class UploadscreenComponent implements OnInit {

  isEmailNull: boolean = false;
  isFoodNull: boolean = false;
  isAddressNull: boolean = false;
  isPincodeNull: boolean = false;
  isQuantityNull: boolean = false;


  uploadForm: FormGroup;

  foodItem: any;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.uploadForm = new FormGroup({
      'email' :new FormControl(this.authService.email),
      'foodName': new FormControl(null, Validators.required),
      'description':  new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'pincode': new FormControl(null, Validators.required),
      'veg': new FormControl('1'),
      'glutenFree': new FormControl('1'),
      'dairy': new FormControl('1'),
      'nutsFree': new FormControl('1'),
      'quantity': new FormControl(null)
    });
  }

  constructor(private route: Router, private router:ActivatedRoute, private http: HttpClient, private authService: AuthService){}

  onSubmit(){
    this.isLoading = true;
    console.log("Done");

    const email=this.uploadForm.get('email')?.value
    const foodname=this.uploadForm.get('foodName')?.value
    const description=this.uploadForm.get('description')?.value
    const address=this.uploadForm.get('address')?.value
    const pincode=this.uploadForm.get('pincode')?.value
    const veg=this.uploadForm.get('veg')?.value
    const glutenFree=this.uploadForm.get('glutenFree')?.value
    const nutsFree=this.uploadForm.get('nutsFree')?.value
    const dairy=this.uploadForm.get('dairy')?.value
    const quantity = this.uploadForm.get('quantity')?.value

    this.foodItem = {
      'email': this.uploadForm.get('email')?.value,
      'foodname': this.uploadForm.get('foodName')?.value,
      'description':  this.uploadForm.get('description')?.value,
      'address': this.uploadForm.get('address')?.value,
      'pincode': this.uploadForm.get('pincode')?.value,
      'veg': this.uploadForm.get('veg')?.value == 1 ? 1:0,
      'glutenFree': this.uploadForm.get('glutenFree')?.value == 1 ? 1:0,
      'nutsFree': this.uploadForm.get('nutsFree')?.value  == 1 ? 1:0,
      'dairy': this.uploadForm.get('dairy')?.value  == 1 ? 1:0,
      'quantity': this.uploadForm.get('quantity')?.value,
    }

    console.log(this.foodItem);


    if(email == null || foodname == null || address== null || pincode==null || veg==null || glutenFree==null
      || nutsFree==null || dairy==null || quantity==null){
        if(email == null){
          this.isEmailNull = true;
        }
        if(foodname == null){
          this.isFoodNull = true;
        }
        if(address == null){
          this.isAddressNull = true;
        }
        if(pincode == null){
          this.isPincodeNull = true;
        }
        if(quantity == 0){
          this.isQuantityNull = true;
        }
      }else{
        console.log(this.foodItem);
        // this.route.navigate(['confirm'], {relativeTo:this.router});
        console.log("Uploading . . .");
        const formData = new FormData();
        formData.append('emailId', email);
        formData.append('foodName', foodname);
        formData.append('description', description);
        formData.append('address', address);
        formData.append('pincode', pincode);
        formData.append('isVeg', veg);
        formData.append('isNutsFree', nutsFree);
        formData.append('isGlutenFree', glutenFree);
        formData.append('isDairyFree', dairy);
        formData.append('quantity', quantity);


        this.http.post(
            'http://34.41.204.34:80/donor/addFoodItem',
            formData
        ).subscribe(
          (      responseData: { hasOwnProperty: (arg0: string) => any; })=>{
              console.log("Came here respo");
              console.log(responseData);
              if(responseData.hasOwnProperty('status')){
                  console.log("Uploaded food. . .");
                  this.isLoading = false;
                  this.route.navigate(['/display'])

              }else if(responseData.hasOwnProperty('Error')){
                  this.isLoading = false;

              }
          },
          (err: any)=>{
                  console.log("Came here");
                  console.log("Error",err);
              }
          );

      }


  }

}
