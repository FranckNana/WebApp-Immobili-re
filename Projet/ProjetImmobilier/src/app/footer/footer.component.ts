import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isAuth: boolean;
  copyrightDate: number;
  isFooterPrint: boolean;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.copyrightDate = new Date().getFullYear();

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
  }

  ngDoCheck(){
    if(this.router.url.startsWith("/page-promoteur")){
      this.isFooterPrint = false;
    }
    else{
      this.isFooterPrint = true;
    }
  }

}


