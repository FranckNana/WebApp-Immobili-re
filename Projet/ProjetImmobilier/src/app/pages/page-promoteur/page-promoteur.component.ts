import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { Users } from 'src/app/models/users.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/ServiceRest/user.service';
import { RespPub } from 'src/app/models/pub.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-promoteur',
  templateUrl: './page-promoteur.component.html',
  styleUrls: ['./page-promoteur.component.css']
  //styleUrls: ['../../assets/css/menu_sideslide.css','../../assets/css/demo.css']

})
export class PagePromoteurComponent implements OnInit, OnDestroy{

  isAuth: boolean;
  isDelete: boolean = false;
  identifiant: number;
  user: Users;
  userSubscription: Subscription;

  respub: RespPub[];
  respubSubscription: Subscription;
  isModif: boolean = false;

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

    this.respubSubscription = this.userService.respubSubject.subscribe(
      (resPub: RespPub[]) =>{
        this.respub = resPub;
      }
    );

    this.userService.onInitGetPubFromServer();

  }

  onSignOut(){
    this.authService.signOutUser();
  }

  
  SideNavDelete(){
    this.isDelete=true;
    this.isModif = false;
  }

  
  ModifPub(){
    this.isModif = true;
    this.isDelete=false;
  }

  onViewModifPub(respub: RespPub) {
    this.router.navigate(['/page-promoteur','modifier-une-offre', respub.id]);
  }
  
  closeSideNav(){
    this.isDelete=false;
    this.isModif = false;
  }

  DeletePub(pub:RespPub){
    this.userService.rmImage(pub);
    this.userService.deleteImgFromServer(pub);
    document.location.reload(true);
    this.isDelete=false;
  }

  deleteUser(){
    this.authService.deleteUserInFireBase();
    this.userService.deleteUserInServer(this.user);
    alert("Toutes nos excuses si vous n'etiez pas satisfait(e) du service!!!");
    this.router.navigate(['/accueil']);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
    this.respubSubscription.unsubscribe();
  }

}




