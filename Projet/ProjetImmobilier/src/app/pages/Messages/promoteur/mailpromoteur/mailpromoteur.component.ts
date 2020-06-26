import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Email, RespEmail } from 'src/app/models/Email.model';
import { UserService } from 'src/app/ServiceRest/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mailpromoteur',
  templateUrl: './mailpromoteur.component.html',
  styleUrls: ['./mailpromoteur.component.css']
})
export class MailpromoteurComponent implements OnInit {

  signUpForm: FormGroup; 

  respemail: RespEmail[];
  respmailSubscription: Subscription;


  constructor( private formBuilder: FormBuilder,
               private userService: UserService,
               private router: Router) { }

  ngOnInit() {
    this.initForm();

    this.respmailSubscription = this.userService.resmailSubject.subscribe(
      (respMail: RespEmail[]) =>{
        this.respemail = respMail;
      }
    );

    this.userService.onInitGetAllEmailFromServer();
  }

  initForm(){
    this.signUpForm = this.formBuilder.group({
      emailDst: ['', [Validators.required, Validators.email]],
      emailFrom: ['', [Validators.required, Validators.email]],
      nom: ['',Validators.required],
      message: ['',Validators.required]
    }); 
  }

  onSubmit(){
    const emailDst = this.signUpForm.get('emailDst').value;
    const emailFrom = this.signUpForm.get('emailFrom').value;
    const nom = this.signUpForm.get('nom').value;
    const message = this.signUpForm.get('message').value;

    const mailToSend = new Email(nom,emailDst,emailFrom,message);

    this.userService.sendMail(mailToSend);

    alert("Envoyé!")

    this.router.navigate(['/page-promoteur']);

  }

  onBack() {
    this.router.navigate(['/page-promoteur']);
  }

  ngOnDestroy(){
    this.respmailSubscription.unsubscribe();
  }

}


