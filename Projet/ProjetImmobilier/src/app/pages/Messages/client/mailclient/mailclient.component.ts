import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { RespEmail, Email } from 'src/app/models/Email.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/ServiceRest/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RespPub } from 'src/app/models/pub.model';
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-mailclient',
  templateUrl: './mailclient.component.html',
  styleUrls: ['./mailclient.component.css']
})
export class MailclientComponent implements OnInit {

  message: string;

  resPub: RespPub;
  user: Users;
  userSubscription: Subscription;

  respemail: RespEmail[];
  respmailSubscription: Subscription;


  constructor( private formBuilder: FormBuilder,
               private userService: UserService,
               private router: Router,
               private route: ActivatedRoute,) { }

  ngOnInit() {

    this.userSubscription = this.userService.userSubject.subscribe(
      (user: Users)=>{
        this.user = user;
      }
    )
    this.userService.onInitGetUserFromServer();

    this.respmailSubscription = this.userService.resmailSubject.subscribe(
      (respMail: RespEmail[]) =>{
        this.respemail = respMail;
      }
    );

    this.userService.onInitGetAllEmailFromServer();

    const id = this.route.snapshot.params['id'];
    this.userService.getSinglePubOfPromoteur(id).then(
      (respub: RespPub) => {
        this.resPub = respub;
      }
    );


  }

  onSubmit(form: NgForm) {

    const mailToSend = new Email(this.user.name,this.resPub.user.email,this.user.email,this.message);

    this.userService.sendMail(mailToSend);

    alert("Envoyé!")

    this.router.navigate(['/page-offres']);
  }

  onBack() {
    this.router.navigate(['/page-client']);
  }

  ngOnDestroy(){
    this.respmailSubscription.unsubscribe();
  }


}
