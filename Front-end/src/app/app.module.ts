import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ResListComponent } from './res-list/res-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadscreenComponent } from './uploadscreen/uploadscreen.component';
import { CartComponent } from './cart/cart.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { foodList } from './res-list/foodlist.service';
import { cartList } from './cart-list/cartList.service';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthService } from './auth.service';
import { DonarScreenComponent } from './donar-screen/donar-screen.component';
import { DonarService } from './donar-screen/donar.service';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { DonarRegistrationPageComponent } from './donar-registration-page/donar-registration-page.component';
const appRoutes: Routes = [
  {path: '', component:HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/donar', component: DonarRegistrationPageComponent},
  {path: 'foodList', component: ResListComponent},
  {path: 'cartList', component: CartListComponent},
  {path: 'upload', component:UploadscreenComponent},
  {path: 'display', component:DonarScreenComponent},
  {path: 'upload/confirm', component:DonarScreenComponent},
  {path: 'thankyou', component:ThankyouComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    ResListComponent,
    LoginComponent,
    RegisterComponent,
    UploadscreenComponent,
    CartComponent,
    CartListComponent,
    HeaderComponent,
    HomepageComponent,
    DonarScreenComponent,
    ThankyouComponent,
    DonarRegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forRoot(appRoutes)
  ],
  providers: [foodList, cartList, AuthService, DonarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
