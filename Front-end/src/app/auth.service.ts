import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    constructor(private http: HttpClient){}

    accountType: string = "";

    isChecking: boolean = false;

    email: string = "";






    getAccountType(){
        return this.accountType;
    }

    setAccountType(type: string){
        this.accountType = type;
    }

    login(email: any, password:any): any{

        const data = {
            emailId: email,
            password: password
        }

        this.email = email;

        console.log(this.accountType);


        const formData = new FormData();
        formData.append('emailId',email);
        formData.append('password',password);
        console.log("Your",email,password, data);

        if(this.accountType == "user"){
            return this.http.post(
                // 'http://localhost:5001/user/loginUser',
                'http://34.16.11.211:80/user/loginUser',
                formData
            );

        }
        if(this.accountType == "donor"){
            return this.http.post(
                'http://34.41.204.34:80/donor/loginDonor',
                formData
            );
        }
    }

    register(details: any){
        console.log("came here to register->");
        const formData = new FormData();
        formData.append('name',details.username)
        formData.append('emailId',details.email)
        formData.append('password',details.password)
        formData.append('phoneNumber',details.phoneNumber)
        console.log(details);
        console.log("came here 1234");

        return this.http.post(
            // 'http://localhost:5001/user/createUser',
            'http://34.16.11.211:80/user/createUser',
            formData
        );
    }

}
