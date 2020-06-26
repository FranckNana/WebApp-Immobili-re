import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyC6fX_fgGdbUskE_laKN9NrXgllSE6AeYo",
      authDomain: "projetimmobilier-a9847.firebaseapp.com",
      databaseURL: "https://projetimmobilier-a9847.firebaseio.com",
      projectId: "projetimmobilier-a9847",
      storageBucket: "projetimmobilier-a9847.appspot.com",
      messagingSenderId: "716890513676",
      appId: "1:716890513676:web:4a53eaadacda13e9a0a929",
      measurementId: "G-1NFMZY099R"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

}
