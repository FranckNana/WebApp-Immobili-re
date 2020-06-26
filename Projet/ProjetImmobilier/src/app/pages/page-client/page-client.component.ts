import { Component, OnInit, OnDestroy } from '@angular/core';
import { Users } from 'src/app/models/users.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/ServiceRest/user.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-client',
  templateUrl: './page-client.component.html',
  styleUrls: ['./page-client.component.css']
})
export class PageClientComponent implements OnInit, OnDestroy{
  isAuth: boolean;
  user: Users;
  userSubscription: Subscription;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.user = new Users('','','', '', '','','','');

    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.isAuth=true;
        }
        else{
          this.isAuth=false;
        }
      }
    );

    this.userSubscription = this.userService.userSubject.subscribe(
      (user: Users) => {
        this.user = user; 
      }
    );

    this.userService.onInitGetUserFromServer();

  }

  onSignOut(){
    this.authService.signOutUser();
  }

  deleteUser(){
    this.authService.deleteUserInFireBase();
    this.userService.deleteUserInServer(this.user);
    alert("Toutes nos excuses si vous n'etiez pas satisfait(e) du service!!!");
    this.router.navigate(['/accueil']);
  }
  
  /* !!! fonctionnalités pour "consulter vos offres favorites, ou les offres enregistrées" !!!
  SideNavDelete(){
    this.isDelete=true;
  }
  
  closeSideNav(){
    this.isDelete=false;
  }

  DeletePub(pub:RespPub){
    this.userService.rmImage(pub);
    this.userService.deleteImgFromServer(pub);
    document.location.reload(true);
    this.isDelete=false;
  }
  */

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
