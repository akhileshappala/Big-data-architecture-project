import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from '../environments/environment';
const userAPIURL = environment.userAPIURL;
const donorApiUrl = environment.donorAPIURL;
@Injectable({
    providedIn: 'root'
})
export class AuthService{

    constructor(private http: HttpClient){}
    private sessionUser = new Subject<any>();;
    private isAuthenticatedSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
        accountType: string = "";

    isChecking: boolean = false;

    email: string = "";

    getAccountType(){
        return this.accountType;
    }
    setAccountType(type: string){
        this.accountType = type;
    }
    login(email: any, password:any): Observable<any>{
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
        this.updateUser({email: this.email, accountType : this.accountType});
        // const isAuthenticated = email !== '' && password !== '';
        this.isAuthenticatedSubject.next({email: this.email, accountType : this.accountType});
        if(this.accountType == "user"){
            return this.http.post(
                // 'http://localhost:5001/user/loginUser',
                userAPIURL + '/user/loginUser',
                formData
            );

        }
        if(this.accountType == "donor"){
            return this.http.post(
                donorApiUrl + '/donor/loginDonor',
                formData
            );
            
        }
        return this.http.post(
            // 'http://localhost:5001/user/loginUser',
            userAPIURL + '/user/loginUser',
            formData
        );
       
    }

     register(details: any): Observable<any>{
        console.log("came here to register->");
        const formData = new FormData();
        formData.append('name',details.username)
        formData.append('emailId',details.email)
        formData.append('password',details.password)
        formData.append('phoneNumber',details.phoneNumber)
        console.log(details);
        return this.http.post(
            // 'http://localhost:5001/user/createUser',
            userAPIURL + '/user/createUser',
            formData
        );
    }

    updateUser(sessionObj: any) {
        this.sessionUser.next(sessionObj);
      }
    
      isAuthenticated(): Observable<any> {
        return this.isAuthenticatedSubject.asObservable();
      }
    getUserName() {
        return this.sessionUser;
      }

}
