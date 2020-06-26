import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/ServiceRest/user.service';

@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent implements OnInit {

  signInForm: FormGroup;  
  errorMessage: string;
  isAuthClient: boolean;

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

  
  ngDoCheck(){
    if(this.router.url.startsWith("/auth/signup/client")){
      this.isAuthClient = true;
    }
    else{
      this.isAuthClient = false;
    }
  }
  
  onSubmit(){
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
 
    this.authService.signInUser(email,password).then(
      ()=>{
        sessionStorage.setItem("email", email); //used to set the value to the navigator storage.
        this.userService.getUserFromServer(email).then(
          ()=>{
            if(this.userService.user.accountType === "client")
              this.router.navigate(['/offres']);
            else {
              this.authService.signOutUser();
              alert("Vous n'êtes pas client !!!!!!!!!")
            }
          });
      },
      (error)=>{
        this.errorMessage = error;
      }
    );
  }
}
