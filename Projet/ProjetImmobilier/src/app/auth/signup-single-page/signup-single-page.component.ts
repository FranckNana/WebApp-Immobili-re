import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/ServiceRest/user.service';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/users.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup-single-page',
  templateUrl: './signup-single-page.component.html',
  styleUrls: ['./signup-single-page.component.css']
})
export class SignupSinglePageComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;  
  errorMessage: string;
  isHomme: boolean;

  user: Users;
  userSubscription: Subscription;

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private userService: UserService,
               private router: Router) { }

  ngOnInit() {
    this.initForm();

    this.userSubscription = this.userService.userSubject.subscribe(
      (user: Users) => {
        this.user = user; 
      }
    );
    this.userService.emitUserSubject();
  }

  initForm(){
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      
      surname: ['',Validators.required],
      name: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      address: ['',Validators.required],
      city: ['',Validators.required],
      codePostal: ['',Validators.required],
      accountType: ['',Validators.required]
    }); 
  }

  onSubmit(){
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;

    const surname = this.signUpForm.get('surname').value;
    const name = this.signUpForm.get('name').value;
    const phoneNumber = this.signUpForm.get('phoneNumber').value;
    const address = this.signUpForm.get('address').value;
    const city = this.signUpForm.get('city').value;
    const codePostal = this.signUpForm.get('codePostal').value;
    const accountType = this.signUpForm.get('accountType').value;
    console.log(accountType);

    sessionStorage.setItem("email", email); //used to set the value to the navigator storage.
    const newUser = new Users(email, name,accountType, surname, phoneNumber, address,city, codePostal);

    this.authService.createNewUser(email,password).then(
      ()=>{
        this.userService.CreateNewUser(newUser);
        this.router.navigate(['accueil']);
        this.authService.signOutUser();
      },
      (error)=>{
        this.errorMessage = error;
      }
    );

  }

  

 ngOnDestroy(){
  this.userSubscription.unsubscribe();
}

}

