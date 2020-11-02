import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.page.html',
  styleUrls: ['./verifycode.page.scss'],
})
export class VerifycodePage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/users/';
  otpgroup: FormGroup;
  email; user_id; flowpage; flowData;
  constructor(private navController: NavController, private router: Router,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    public toast: ToastController,
    public httpClient: HttpClient,
    public formBuilder: FormBuilder,) {
    this.route.queryParams.subscribe(params => {
      this.flowData = params
      this.email = params["email"];
      this.user_id = params['user_id'];
      this.flowpage = params['frompage'];
      console.log(this.email, this.user_id, this.flowpage, this.flowData)
    });
    this.otpgroup = this.formBuilder.group({
      'p1': ['',],
      'p2': ['',],
      'p3': ['',],
      'p4': ['',],
      'p5': ['',],
      'p6': ['',],

    })
  }

  ngOnInit() {
  }

  credit() {
    this.navController.navigateForward(`/tabs/credit`);
  }
  next(event, next, prev) {
    if (event.target.value.length < 1 && prev) {
      prev.setFocus()
    }
    else if (next && event.target.value.length > 0) {
      next.setFocus();
    }
    else {
      return 0;
    }
  }
  async verifyOTP() {
    // if(this.flowpage=='flowregister'){
    //   this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/flowcredit`);
    // }else if(this.flowpage=='guestlogin'){
    //   this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/guestcrerdit`); 
    // }
    // else{
    //   this.navController.navigateForward(`/tabs`);
    // }
    let otpData = this.otpgroup.value;
    let otp = otpData.p1 + otpData.p2 + otpData.p3 + otpData.p4 + otpData.p5 + otpData.p6;
    let data = new FormData();
    data.append('security_key', '07b104b8d15d870b92938dae3440bc1a5152e02e');
    data.append('otp', otp);
    data.append('userid', this.user_id)
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'checkUserOTP', data)
        .subscribe((res: any) => {
          console.log(res);
          if (res.status == true) {

            if (this.flowpage == 'flowregister') {
              localStorage.setItem('loggedIn', 'true');
              localStorage.setItem('user_id', res.data.user_id);
              localStorage.setItem('user_email', res.data.email);
              localStorage.setItem('user_mobile', res.data.user_phone)
              if (this.flowData.promoApplied == 'true' || this.flowData.promoApplied == true) {
                this.checkPromoValid()
              } else {
                let navObj = { 'fromPage': 'flowregister', 'wallet_Amount': "0", 'promoAmt': this.flowData.creditAmt, 'creditAmt': this.flowData.creditAmt, 'promoValid': false, 'promoApplied': false }
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    pageData: JSON.stringify(navObj)
                  }
                }
                this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/flowcredit`, navigationExtras);
              }

            } else if (this.flowpage == 'guestlogin') {
              let navObj = { 'fromPage': 'guestlogin', 'wallet_Amount': "0" }
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  pageData: JSON.stringify(navObj)
                }
              }
              this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/guestcrerdit`, navigationExtras);
            }
            else {
              localStorage.setItem('loggedIn', 'true');
              localStorage.setItem('user_id', res.data.user_id);
              localStorage.setItem('user_email', res.data.email);
              localStorage.setItem('user_mobile', res.data.user_phone)
              this.navController.navigateForward(`/tabs`);
            }


          }
          loading.dismiss()
        }, error => {
        });
    })

  }

  // let navObj = { 'fromPage': 'flowregister','wallet_Amount': "0", 'promoAmt': this.flowData.promoAmt, 'creditAmt': this.flowData.creditAmt, 'promoValid': true,'promoApplied':this.flowData.promoApplied   }
  //           let navigationExtras: NavigationExtras = {
  //             queryParams: {
  //               pageData: JSON.stringify(navObj)
  //             }
  //           }
  //             this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/flowcredit`,navigationExtras);
  async checkPromoValid() {
    var loggedin = localStorage.getItem('loggedIn')
     
      let data = new FormData();
      data.append('security_key', 'b20be5c19392f899fbd870dfc85f180a98ffa2bd');
      data.append('promo_code', this.flowData.promocode);
      data.append('user_email', localStorage.getItem('user_email'));
      var apiUrl = "http://18.134.186.121/apis/api/payments/"
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',

      });
      await loading.present().then(() => {
        this.httpClient.post(apiUrl + 'getValidatePromoCode', data)
          .subscribe((res: any) => {
            loading.dismiss();
            if (res.status == true) {
              // this.confirmBooking()// logged in user + promocode
              console.log("price should be promocode applied price, ", this.flowData.promoAmt);
              let navObj = { 'fromPage': 'flowregister', 'wallet_Amount': "0", 'promoAmt': this.flowData.promoAmt, 'creditAmt': this.flowData.creditAmt, 'promoValid': true, 'promoApplied': true }
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    pageData: JSON.stringify(navObj)
                  }
                }
                this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/flowcredit`, navigationExtras);
           
            } else {
              // Promocode not applicable for this user
              this.showToast('Promocode not applicable for you')
              let navObj = { 'fromPage': 'flowregister', 'wallet_Amount': "0", 'promoAmt': this.flowData.creditAmt, 'creditAmt': this.flowData.creditAmt, 'promoValid': false, 'promoApplied': false }
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  pageData: JSON.stringify(navObj)
                }
              }
              this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/flowcredit`, navigationExtras);
         
               
            }
          }, error => {
            loading.dismiss()
          });

      })
      
  }
  async resendOTP() {
    this.otpgroup.reset()
    let data = new FormData();
    data.append('security_key', '8e670f966f0e16d11e6b82ed202a191aab3e4f1b');
    data.append('email', this.email);
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'resendOtp', data)
        .subscribe((res: any) => {
          console.log(res);
          if (res.status == true) {


          }
          this.showToast(res.message);
          loading.dismiss()
        }, error => {
          console.log(error)
          loading.dismiss()
        })
    })
  }
  async showToast(msg) {
    let toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: "top"
    })
    toast.present();
  }

}
