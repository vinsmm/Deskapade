import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/users/';
  user_email='';
  constructor(private navController: NavController, private router: Router,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public httpClient: HttpClient,
    public toast: ToastController,
  ) { }

  ngOnInit() {
  }
  async forgotPass() {
   if(this.user_email.length==0){
     this.showToast("Please enter email")
   }else{
    let data = new FormData();
    data.append('security_key', 'bc15d63b154e8327e9bc5dfba2c12c743a461fe8');
    data.append('email', this.user_email);
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'forgotPassLink', data)
        .subscribe((res: any) => {
          if (res.status == true) {
            this.showToast(res.message)
            // this.navController.navigateForward(`/tabs/credit`);
            // this.navController.navigateForward(`/verifycode`);
          }
          loading.dismiss()
        }, error => {
        });
    })
   }

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
