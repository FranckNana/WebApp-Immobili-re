import { Component, OnInit } from '@angular/core';
import { RespPub } from 'src/app/models/pub.model';
import { UserService } from 'src/app/ServiceRest/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/users.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modification-offre',
  templateUrl: './modification-offre.component.html',
  styleUrls: ['./modification-offre.component.css']
})
export class ModificationOffreComponent implements OnInit {

  resPub: RespPub;
  resSinglePubSubscription: Subscription;

  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute, 
              private router: Router) {}

  ngOnInit() {
    this.resPub = new RespPub(0, "", "", 0, 0,"", "", "", new Users("","","","","","","",""));

    const id = this.route.snapshot.params['id'];
    this.userService.getSinglePubOfPromoteur(id).then(
      (respub: RespPub) => {
        this.resPub = respub;

        if(!this.resPub.photo)
          this.fileUploaded = true;
      }
    );
    //this.userService.onInitGetPubFromServer();
    
  }

  onBack() {
    this.router.navigate(['/page-promoteur']);
  }

  onSubmit(form: NgForm) {
    this.userService.ModifPubIntoBase(this.resPub);
    alert('Vos modifications ont été prises en compte');
    this.router.navigate(['/page-promoteur']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.userService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        if(this.fileUrl && this.fileUrl !== '') {
          this.resPub.photo = this.fileUrl;
        }
      }
    );

  }

  deleteFile(){
    this.fileUploaded=false;
    const urlPhoto = this.resPub.photo.substring(this.resPub.photo.indexOf('images%2F')+9, this.resPub.photo.indexOf('?alt'));
    this.userService.PubModifRemoveImageJustBeforUpload(urlPhoto);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
  
}



