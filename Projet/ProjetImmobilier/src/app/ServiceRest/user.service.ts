import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Users } from '../models/users.model';
import * as firebase from 'firebase';
import { Pub, RespPub } from '../models/pub.model';
import { Email, RespEmail } from '../models/Email.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Users;
  userSubject = new Subject<Users>();
  url: String;

  respub: RespPub[] = [];
  respubSubject = new Subject<RespPub[]>();

  offresPub: RespPub[] = [];
  offrespubSubject = new Subject<RespPub[]>();

  resemail: RespEmail[] = [];
  resmailSubject = new Subject<RespEmail[]>();

  singlePub: RespPub;
  singlePubSubject = new Subject<RespPub>();

  constructor(private http: HttpClient) { this.onInitGetAllPubFromServer(); }

  /*sessionStorage.setItem("key",value); // used to set the value.
    sessionStorage.getItem("key"); //used to get the value.
    sessionStorage.clear(); //used to clear the value which is set
    */

  emitUserSubject() {
    this.userSubject.next(this.user);
  }

  emitRespPubSubject() {
    this.respubSubject.next(this.respub);
  }

  emitsinglePubSubject() {
    this.singlePubSubject.next(this.singlePub);
  }

  emitRespMailSubject() {
    this.resmailSubject.next(this.resemail);
  }

  emitOffrePubSubject() {
    this.offrespubSubject.next(this.offresPub);
  }

  CreateNewUser(newUser: Users) {
    this.user = newUser;

    this.http
      .post<Users>("http://localhost:8080/newusers", this.user)
      .subscribe(
        () => {
          console.log('Utilisateur créé');
          this.emitUserSubject();
        },
        (error) => {
          console.log('Erreur de sauvegarde : ' + error);
        }
      );

  }

  getUserFromServer(email: string) {
    const url = "http://localhost:8080/connexion/" + email;

    return new Promise(
      (resolve, reject) => {
        this.http.get<Users>(url).subscribe(
          (response) => {
            resolve(this.user = response);
            this.emitUserSubject();
          },
          (error) => {
            console.log('erreur de chargement ! ' + error);
            reject(error);
          }
        );
      });
  }

  onInitGetUserFromServer() {
    const userStoredEmail = sessionStorage.getItem("email");
    const url = "http://localhost:8080/connexion/" + userStoredEmail;

    this.http
      .get<Users>(url)
      .subscribe(
        (response) => {
          this.user = response;
          this.emitUserSubject();
        },
        (error) => {
          console.log('erreur de chargement ! ' + error);
        }
      );

  }


  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {

        const almostUniqueFileName = Date.now().toString();

        this.url = almostUniqueFileName + file.name;

        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

  SavePubIntoBase(pub: Pub) {
    const url = "http://localhost:8080/newpublication";

    this.http.post<Pub>(url, pub)
      .subscribe(
        () => {
          console.log('publication enregistrée');
        },
        (error) => {
          console.log('Erreur de sauvegarde : ' + error);
        }
      );
  }

  // Create a reference to the file to delete
  rmImageJustBeforUpload() {
    var delRef = firebase.storage().ref().child('images/' + this.url);
    // Delete the file
    delRef.delete().then(function () {
      console.log('suppression réussie');
    }).catch(function (error) {
      console.log(error);
    });
  }

  // Create a reference to the file to delete
  PubModifRemoveImageJustBeforUpload(url: string) {
    var delRef = firebase.storage().ref().child('images/' + url);
    // Delete the file
    delRef.delete().then(function () {
      console.log('suppression réussie');
    }).catch(function (error) {
      console.log(error);
    });
  }

  getPromoteurPubFromServer(email: string) {
    const url = "http://localhost:8080/publications/" + email;

    return new Promise(
      (resolve, reject) => {
        this.http.get<RespPub[]>(url).subscribe(
          (response) => {
            resolve(this.respub = response);
            this.emitRespPubSubject();
          },
          (error) => {
            console.log('erreur de recupération de publication! ' + error);
            reject(error);
          }
        );
      });
  }

  onInitGetPubFromServer() {
    const userStoredEmail = sessionStorage.getItem("email");
    const url = "http://localhost:8080/publications/" + userStoredEmail;

    this.http
      .get<RespPub[]>(url)
      .subscribe(
        (response) => {
          this.respub = response;
          this.emitRespPubSubject();
        },
        (error) => {
          console.log('erreur de recupération des publications du promoteur ! ' + error);
        });

  }

  /*getSinglePubOfPromoteur(id: number) {
    return new Promise(
      (resolve) => {
        resolve(this.respub[id]);
      }
      );
    }*/


  getSinglePubOfPromoteur(id: number) {
    const url = "http://localhost:8080/publication/" + id;

    return new Promise(
      (resolve, reject) => {
        this.http.get<RespPub>(url).subscribe(
          (response) => {
            resolve(this.singlePub = response);
            this.emitsinglePubSubject();
          },
          (error) => {
            console.log('erreur de chargement de la publication! ' + error);
            reject(error);
          }
        );
      });
  }

  rmImage(respub: RespPub) {
    if (respub.photo) {
      const storageRef = firebase.storage().refFromURL(respub.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
  }

  deleteImgFromServer(respub: RespPub) {

    this.http
      .delete<RespPub>("http://localhost:8080/delete" + "/" + respub.id)
      .subscribe(
        () => {
          console.log('Publication Supprimée');
          this.emitRespPubSubject();
        },
        (error) => {
          console.log('Erreur de suppression de Pub : ' + error);
        }
      );
  }

  deleteUserInServer(user: Users) {
    //var user = firebase.auth().currentUser;
    this.http
      .delete<RespPub>("http://localhost:8080/deleteuser" + "/" + user.email)
      .subscribe(
        () => {
          console.log('Publication Supprimée');
          this.emitRespPubSubject();
        },
        (error) => {
          console.log('Erreur de suppression de Pub : ' + error);
        }
      );
  }

  onInitGetAllPubFromServer() {
    const url = "http://localhost:8080/publications";

    return new Promise(
      (resolve, reject) => {
        this.http.get<RespPub[]>(url).subscribe(
          (response) => {
            resolve(this.offresPub = response);
            this.emitOffrePubSubject();
          },
          (error) => {
            console.log('erreur de recupération de toutes les publications ! ' + error);
            reject(error);
          }
        );
      });
  }

  sendMail(email: Email) {
    const url = "http://localhost:8080/send-mail";
    this.http
      .post<Email>(url, email)
      .subscribe(
        () => {
          console.log('message envoyé...');
        },
        (error) => {
          console.log('Erreur d envoie de message : ' + error);
        }
      );

  }

  getAllEmailFromServer(email: String) {
    const url = "http://localhost:8080/mesmail/" + email;

    return new Promise(
      (resolve, reject) => {
        this.http.get<RespEmail[]>(url).subscribe(
          (response) => {
            resolve(this.resemail = response);
            this.emitRespMailSubject();
          },
          (error) => {
            console.log('erreur de recupération des mail de l utilisateur ! ' + error);
            reject(error);
          }
        );
      });
  }


  onInitGetAllEmailFromServer() {
    const userStoredEmail = sessionStorage.getItem("email");
    const url = "http://localhost:8080/mesmail/" + userStoredEmail;

    return new Promise(
      (resolve, reject) => {
        this.http.get<RespEmail[]>(url).subscribe(
          (response) => {
            resolve(this.resemail = response);
            this.emitRespMailSubject();
          },
          (error) => {
            console.log('erreur de recupération des mail de l utilisateur ! ' + error);
            reject(error);
          }
        );
      });
  }

  ModifPubIntoBase(pub: Pub) {
    const url = "http://localhost:8080/modification-pub";

    this.http.put<Pub>(url, pub)
      .subscribe(
        () => {
          console.log('publication modifiée');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ModifUserIntoBase() {
    const url = "http://localhost:8080/modification-user";

    this.http.put<Users>(url, this.user)
      .subscribe(
        () => {
          console.log('compte utilisateur modifiée');
        },
        (error) => {
          console.log(error);
        } 
    );
  }

}


