import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { MyeventService } from 'src/myevent/myevent.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/users/';
  registerForm: FormGroup;
  loginForm: FormGroup;
  removeGuest;
  constructor(public httpClient: HttpClient,
    public formBuilder: FormBuilder,
    private navController: NavController,
    private router: Router,
    public toast: ToastController,
    public event: MyeventService,
    public loadingController: LoadingController) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  }

  ngOnInit() {
    var loggedtype = localStorage.getItem('logintype');
    if (loggedtype == 'forced') {
      this.removeGuest = true
    } else {
      this.removeGuest = false;
    }

  }
  ionViewDidEnter() {
    console.log(this.removeGuest);

  }


  guestLogin() {
    this.presentLoading()
    this.navController.navigateForward(`/login/guestlogin`);

  }


  forgot() {
    this.navController.navigateForward(`/forgotpassword`);
  }

  verify() {

    this.navController.navigateForward(`/verifycode`);
  }

  async login() {
    console.log(this.loginForm.value.email.length, this.loginForm.value.password.length)
    if (this.loginForm.value.email.length == 0) {
      this.showToast('Please enter email')
    } else if (this.loginForm.value.password.length==0) {
      this.showToast('Please enter password')
    } else {


      let data = new FormData();
      data.append('security_key', '179d89369fcd37d62ed9a5bc60c2371d4f82acea');
      data.append('username', this.loginForm.value.email);
      data.append('password', this.loginForm.value.password);
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',

      });
      await loading.present().then(() => {
        this.httpClient.post(this.apiUrl + 'userLogin', data)
          .subscribe((res: any) => {
            console.log(res);
            loading.dismiss()
            if (res.status == true) {
              localStorage.setItem('loggedIn', 'true');
              localStorage.setItem('user_id', res.data.user_id);
              localStorage.setItem('user_email', res.data.email);
              localStorage.setItem('user_mobile', res.data.mobile)
              this.navController.navigateRoot(`/tabs`);
              if (res.message == "User signed-in") {
                this.showToast('User Logged In')
              } else {
                this.showToast(res.message)
              }
            } else {
              this.showToast(res.message)
            }


          }, error => {
            loading.dismiss()
          });

      })
    }

  }

  register() {
    this.presentLoading()
    this.navController.navigateForward(`/registration`);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
      mode: 'ios',
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
