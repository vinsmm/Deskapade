import { Component, OnInit } from '@angular/core';
import { NavController,ToastController  } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import {  FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController } from '@ionic/angular'; 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/users/';
segmentModel = "one";
registerForm: FormGroup;
  constructor(public httpClient: HttpClient,private navController: NavController,
     private router: Router,
     public loadingController: LoadingController,
     public formBuilder: FormBuilder,
     public toast:ToastController,) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.maxLength(100) ,Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(100) ,Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      number: [''],
      age: '',
      empStatus: '',
      campanyName: '',
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
     },
      {validator: this.matchingPasswords('password', 'confirmPassword')});

   }

   ngOnInit() {
  }
   segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }
   
   credit() {
	     this.presentLoading() 
	    this.navController.navigateForward(`/tabs/credit`);

  }

  async submitForm()
  {
   
    let data = new FormData();
    data.append('security_key', 'b5af77f7785e794345a87e0f0734a11d301c772e');
    data.append('first_name',this.registerForm.value.firstname);
    data.append('last_name',this.registerForm.value.lastname);
    data.append('email',this.registerForm.value.email);
    data.append('user_phone',this.registerForm.value.number);
    data.append('age', this.registerForm.value.age);
    data.append('occupation', this.registerForm.value.empStatus);
    data.append('company', this.registerForm.value.campanyName);
    data.append('password', this.registerForm.value.password);
    data.append('is_guest','1');
    // let loader = this.loadingCtrl.create({
    //   });  
    // loader.present();
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
       
    });
    await loading.present().then(()=>{
      this.httpClient.post(this.apiUrl + 'userSignup', data)
      .subscribe((res: any) => {
        console.log(res.data.userid);
        if(res.status==true)
        { 

          let navigationExtras: NavigationExtras = {
            queryParams: {
              email: this.registerForm.value.email,
              user_id:res.data.userid,
            }
          }
            this.router.navigate(['/verifycode'], navigationExtras);
          // this.navController.navigateForward(`/verifycode`);
        }
        this.showToast(res.message)
      loading.dismiss()
      }, error => {
        loading.dismiss()
      });
    })

    


  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) 
  {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  } 
  
 
  loginin() {
  this.presentLoading() 
this.navController.navigateForward(`/login`);
  }
  
   async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async showToast(msg) {
    let toast = await this.toast.create({
      message: msg,
      duration: 3000,
      position: "top"
    })
    toast.present()
  }
}
