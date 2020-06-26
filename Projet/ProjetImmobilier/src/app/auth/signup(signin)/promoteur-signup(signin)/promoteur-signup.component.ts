import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/ServiceRest/user.service';
import { Users } from 'src/app/models/users.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-promoteur-signup',
  templateUrl: './promoteur-signup.component.html',
  styleUrls: ['./promoteur-signup.component.css']
})
export class PromoteurSignupComponent implements OnInit{

  signInForm: FormGroup;  
  errorMessage: string;

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private router: Router,
               private userService: UserService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    }); 
  }

  onSubmit(){
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;

    this.authService.signInUser(email,password).then(
      ()=>{
        sessionStorage.setItem("email", email); //used to set the value to the navigator storage.
        this.userService.getPromoteurPubFromServer(email);
        this.userService.getUserFromServer(email).then(
          ()=>{
            if(this.userService.user.accountType === "promoteur")
              this.router.navigate(['/page-promoteur']);
            else {
              this.authService.signOutUser();
              alert("Vous n'êtes pas promoteur !!!!!!!!!")
            }
          });
      },
      (error)=>{
        this.errorMessage = error;
      }
    );
  }

}




