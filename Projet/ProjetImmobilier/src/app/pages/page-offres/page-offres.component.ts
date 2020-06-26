import { Component, OnInit, OnDestroy } from '@angular/core';
import { RespPub } from 'src/app/models/pub.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/ServiceRest/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-offres',
  templateUrl: './page-offres.component.html',
  styleUrls: ['./page-offres.component.css']
})
export class PageOffresComponent implements OnInit, OnDestroy {

  offresPub: RespPub[] = [];
  offresPubSubscription: Subscription;

  offresPubSlice: RespPub[] = [];
  selected = 'prix';

  offerType = [
    {
      type: 'magasin',
      number: 0
    },
    {
      type: 'boutique',
      number: 0
    },
    {
      type: 'bureau',
      number: 0
    },
    {
      type: 'habitation',
      number: 0
    }
  ]

  offerTypeSlice: any[];

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {

    this.offresPubSubscription = this.userService.offrespubSubject.subscribe(
      (offresPub: RespPub[]) =>{
        this.offresPub = offresPub;
      }
    );

    this.userService.onInitGetAllPubFromServer().then(
      () => {
        this.offresPubSlice = this.offresPub.slice();

        this.fillOfferType();
        this.offerTypeSlice = this.offerType.slice();
      }
    );

  }

  ngOnDestroy() {
    this.offresPubSubscription.unsubscribe();
  }

  fillOfferType() {
  this.offresPub.forEach(
    (pub) => {
      switch (pub.fonction) {
        case "boutique":
            this.offerType[1].number++;
            break;
        case "habitation":
            this.offerType[3].number++;
            break;
        case "bureau":
          this.offerType[2].number++;
            break;
        case "magasin":
          this.offerType[0].number++;
            break;    
        }
     });
  }

  sliceOfferPubByCategory(type: string) {
    this.offresPubSlice = this.offresPubSlice.filter(
      (pub) => {
        return pub.fonction === type;
      }
    );

    this.offerTypeSlice = this.offerTypeSlice.filter(
      (offerType) => {
        return offerType.type === type;
      }
    );
  }

  resetOffer() {
    this.offresPubSlice = this.offresPub;
    this.offerTypeSlice = this.offerType;
  }

  contacter(respub:RespPub){
    this.router.navigate(['/offres','page-client-mail', respub.id]);
  }

}
