import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor() { }

    createNewUser(email: string, password: string) {
        return new Promise(
          (resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(
              () => {
                resolve();
              },
              (error) => {
                reject(error);
              } 
            );
          }
        );
    }

    signInUser(email: string, password: string) {
        return new Promise(
          (resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then(
              () => {
                resolve();
              },
              (error) => {
                reject(error);
              }
            );
          }
        );
    }

    signOutUser() {
        firebase.auth().signOut();
    }


    deleteUserInFireBase(){
      var user = firebase.auth().currentUser;

      user.delete().then(function() {
        console.log("user deleted");
      }).catch(function(error) {
        console.log("user not deleted");
      });
    }

}