import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageAccueilComponent } from './page-accueil/page-accueil.component';
import { PageClientComponent } from './pages/page-client/page-client.component';
import { PagePromoteurComponent } from './pages/page-promoteur/page-promoteur.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SingleFormComponent } from './pages/page-promoteur/single-form/single-form.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGardService } from './services/auth-guard.service';
import { ClientSignupComponent } from './auth/signup(signin)/client-signup(signin)/client-signup.component';
import { PromoteurSignupComponent } from './auth/signup(signin)/promoteur-signup(signin)/promoteur-signup.component';
import { PageOffresComponent } from './pages/page-offres/page-offres.component';
import { FooterComponent } from './footer/footer.component';
import { SignupSinglePageComponent } from './auth/signup-single-page/signup-single-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UserService } from './ServiceRest/user.service';
import { MailpromoteurComponent } from './pages/Messages/promoteur/mailpromoteur/mailpromoteur.component';
import { ModificationOffreComponent } from './pages/page-promoteur/modification-offre/modification-offre.component';
import { ModificationCompteComponent } from './pages/modification-compte/modification-compte.component';
import { MailclientComponent } from './pages/Messages/client/mailclient/mailclient.component';


const appRoutes: Routes = [
  { path: 'auth/signup/client', component: ClientSignupComponent},
  { path: 'auth/signup/promoteur',    component: PromoteurSignupComponent },
  { path: 'auth/signupSinglePage', component: SignupSinglePageComponent},

  { path: 'page-client', component: PageClientComponent},
  { path: 'page-client-mail', component: MailclientComponent},

  { path: 'page-promoteur', component: PagePromoteurComponent},
  { path: 'page-promoteur/newPub', component: SingleFormComponent},
  { path: 'page-promoteur/modifier-une-offre/:id', component: ModificationOffreComponent},
  { path: 'offres/page-client-mail/:id', component: MailclientComponent},
  { path: 'page-promoteur-mail', component: MailpromoteurComponent},
  { path: 'modifier-son-compte', component: ModificationCompteComponent},

  { path: 'offres', component: PageOffresComponent},
  { path: 'accueil', component: PageAccueilComponent},
  { path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: '**', redirectTo: 'accueil'}
]

@NgModule({
  declarations: [
    AppComponent,
    PageAccueilComponent,
    PageClientComponent,
    PagePromoteurComponent,
    SingleFormComponent,
    HeaderComponent,
    ClientSignupComponent,
    PromoteurSignupComponent,
    PageOffresComponent,
    FooterComponent,
    SignupSinglePageComponent,
    MailpromoteurComponent,
    ModificationOffreComponent,
    ModificationCompteComponent,
    MailclientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    AuthGardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
