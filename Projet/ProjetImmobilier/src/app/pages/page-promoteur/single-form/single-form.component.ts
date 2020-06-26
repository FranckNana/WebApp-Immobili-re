import { Component, OnInit } from '@angular/core';
import { Pub } from 'src/app/models/pub.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/ServiceRest/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-form',
  templateUrl: './single-form.component.html',
  styleUrls: ['./single-form.component.css']
})
export class SingleFormComponent implements OnInit {

  imgForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  pub: Pub; 
  photoUrl: string;

  user: Users;
  userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();

    this.userSubscription = this.userService.userSubject.subscribe(
      (user: Users) => {
        this.user = user; 
      }
    );

    this.userService.onInitGetUserFromServer();
  }

  initForm(){
    this.imgForm = this.formBuilder.group({
      type: ['', Validators.required],
      fonction: ['', Validators.required],
      superficie: ['',Validators.required],
      prix: ['',Validators.required],
      adresse: ['',Validators.required]
    }); 
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.userService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        if(this.fileUrl && this.fileUrl !== '') {
          this.photoUrl = this.fileUrl;
        }
      }
    );

  }

  deleteFile(){
    this.fileUploaded=false;
    this.userService.rmImageJustBeforUpload();
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onSubmit(){

    const type = this.imgForm.get('type').value;
    const fonction = this.imgForm.get('fonction').value;
    const superficie = this.imgForm.get('superficie').value;
    const prix = this.imgForm.get('prix').value;
    const adresse = this.imgForm.get('adresse').value;

    const newPub = new Pub(type,fonction,superficie,prix,adresse);
    newPub.photo = this.photoUrl;
    newPub.email = this.user.email;
    console.log(newPub);

    this.userService.SavePubIntoBase(newPub);
    alert("votre publication a été prise en compte!!!");
    console.log("offre publiée"+newPub);

    this.router.navigate(['/page-promoteur']);

  }


  
}

