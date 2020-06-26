import { Component, OnInit, OnDestroy } from '@angular/core';
import { Users } from 'src/app/models/users.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/ServiceRest/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RespPub } from 'src/app/models/pub.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modification-compte',
  templateUrl: './modification-compte.component.html',
  styleUrls: ['./modification-compte.component.css']
})
export class ModificationCompteComponent implements OnInit, OnDestroy {
  
  user: Users;
  userSubscription: Subscription;

  constructor(private userService: UserService,
              private route: ActivatedRoute, 
              private router: Router) {}

  ngOnInit() {
    this.user = new Users('','','', '', '','','','');
  
    this.userSubscription = this.userService.userSubject.subscribe(
      (user: Users) => {
          this.user = user; 
        }
    );
  
    this.userService.onInitGetUserFromServer();
      
  }
  
  onBack() {
    this.router.navigate(['/accueil']);
  }
  
  onSubmit(form: NgForm) {
    this.userService.ModifUserIntoBase();
    alert('Vos modifications ont été prises en compte');
    this.router.navigate(['/accueil']);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  
}



