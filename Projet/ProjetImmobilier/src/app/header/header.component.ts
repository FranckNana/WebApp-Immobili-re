import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../ServiceRest/user.service';
import { Subscription } from 'rxjs';
import { Users } from '../models/users.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  isNavbarPrint: boolean;
  user: Users;
  userSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {

    this.user = new Users("","","","","","","","");

    this.userSubscription = this.userService.userSubject.subscribe(
      (user: Users) => {
        this.user = user; 
      }
    );

    this.userService.onInitGetUserFromServer();

    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.isAuth=true;
          /*if(this.userService.user.accountType === "promoteur")
            this.accountType = true;
          else if(this.userService.user.accountType  === "client")
            this.accountType = false;*/
        }
        else{
          this.isAuth=false;
        }
      }
    );
  }

  ngDoCheck(){
    if(this.router.url.startsWith("/page-promoteur")){
      this.isNavbarPrint = false;
    }
    else if(this.router.url.startsWith("/page-client")) {
      this.isNavbarPrint = false;
    }
    else if(this.router.url.startsWith("/modifier-son-compte")){
      this.isNavbarPrint = false;
    }
    else
      this.isNavbarPrint = true;
  }
  
  onSignOut(){
    this.authService.signOutUser(); 
    this.router.navigate(['/accueil']);  
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}


