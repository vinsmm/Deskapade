import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { MyeventService } from 'src/myevent/myevent.service';
@Component({
  selector: 'app-flowlogin',
  templateUrl: './flowlogin.page.html',
  styleUrls: ['./flowlogin.page.scss'],
})
export class FlowloginPage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/users/';
  registerForm: FormGroup;
  loginForm: FormGroup;
  removeGuest;;
  guestCredit;
  userId; flowDetails;
  myCreditAmt; buyCredit; loggedIn; emailValid = true;
  constructor(public httpClient: HttpClient,
    public formBuilder: FormBuilder,
    private navController: NavController,
    private route: ActivatedRoute,
    public toast: ToastController,
    public event: MyeventService,
    public loadingController: LoadingController) {
    this.route.queryParams.subscribe(params => {
      this.flowDetails = JSON.parse(params["pageData"]);
    });

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  }
  ngOnInit() {
    var loggedtype = localStorage.getItem('logintype');
    this.guestCredit = localStorage.getItem('creditAmt')
    if (loggedtype == 'forced') {
      this.removeGuest = true
    } else {
      this.removeGuest = false;
    }

  }
  ionViewDidEnter() {

  }
  ionViewWillEnter() {
    if (localStorage.getItem('loggedIn') == 'true') {
      this.navController.pop()
    }
  }


  guestLogin() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        pageData: JSON.stringify(this.flowDetails)
      }
    };
    this.navController.navigateForward(`/login/guestlogin`, navigationExtras);

  }


  forgot() {
    this.navController.navigateForward(`/forgotpassword`);
  }

  verify() {

    this.navController.navigateForward(`/verifycode`);
  }

  async login() {

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
          loading.dismiss()
          if (res.status == true) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('user_id', res.data.user_id);
            localStorage.setItem('user_email', res.data.email);
            localStorage.setItem('user_mobile', res.data.mobile)
            this.userId = res.data.user_id
            if (this.flowDetails.promoApplied == true) {
              this.checkPromoValid()
            } else {
              this.checkCredit()
            }
            // 

          }
          if (res.message == "User signed-in") {
            this.showToast('User Logged In')
          } else {
            this.showToast(res.message)
          }


        }, error => {
          loading.dismiss()
        });

    })


  }

  register() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        pageData: JSON.stringify(this.flowDetails)
      }
    };
    this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/flowregister`, navigationExtras);
  }
  async checkCredit() {
    let data = new FormData();

    data.append('security_key', '61ea8cb8b2d57930b805104c8a31be6b35cfa4f2');
    data.append('user_id', localStorage.getItem('user_id'));
    var apiUrl = "http://18.134.186.121/apis/api/payments/"
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(apiUrl + 'creditHistory', data)
        .subscribe((res: any) => {
          loading.dismiss()
          if (res.status == false) {
            this.myCreditAmt = 0
          } else {
            this.myCreditAmt = parseInt(res.balance)
          }
          this.buyCredit = parseInt(this.flowDetails.creditAmt)
          if (this.myCreditAmt >= this.buyCredit) {
            
            this.directPurchase(this.buyCredit)
          } else {
            let navObj = { 'fromPage': 'flowlogin', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.buyCredit, 'creditAmt': this.buyCredit, 'promoValid': false }
            let navigationExtras: NavigationExtras = {
              queryParams: {
                pageData: JSON.stringify(navObj)
              }
            };
            this.navController.pop()
            this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/flowcredit`, navigationExtras);

          }
        }, error => {
          loading.dismiss()
        });

    })



  }
  async directPurchase(amount) {
    let data = new FormData();
    data.append('security_key', 'b4e123dee8c4be95847b2f870c33c423d3653866');
    data.append('amount', amount);
    data.append('type_id', localStorage.getItem('venue_type'))
    data.append('user_id', localStorage.getItem('user_id'))
    data.append('vendor_id', localStorage.getItem('vendor_id'))
    data.append('booking_date', localStorage.getItem('entDate'))
    data.append('booking_time', localStorage.getItem('stime'))
    data.append('booking_hours', localStorage.getItem('min_hours'))
    data.append('total_persons', localStorage.getItem('persons'))
    data.append('total_amt', amount)
    data.append('user_email', localStorage.getItem('user_email'))
    data.append('promo_code', this.flowDetails.promocode);
    data.append('addition_notes', localStorage.getItem('notes'))
    data.append('vendorloc_id',localStorage.getItem('vendorloc_id'))
    data.append('credit_type', "debit")
    var apiUrl = "http://18.134.186.121/apis/api/payments/"
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(apiUrl + 'directBooking', data)
        .subscribe((res: any) => {
          let navObj = res.data[0]
          let navigationExtras: NavigationExtras = {
            queryParams: {
              bookingData: JSON.stringify(navObj)
            }
          }
          this.navController.navigateForward('/tabs/home/list/amenity/detailtwo/flowlogin/bookingconfirm', navigationExtras)
          loading.dismiss()
        }, error => {
          loading.dismiss()
        });

    })
  }

  async checkPromoValid() {
    let data = new FormData();
    data.append('security_key', 'b20be5c19392f899fbd870dfc85f180a98ffa2bd');
    data.append('promo_code', this.flowDetails.promocode);
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
            let data = new FormData();
            data.append('security_key', '61ea8cb8b2d57930b805104c8a31be6b35cfa4f2');
            data.append('user_id', localStorage.getItem('user_id'));
            var apiUrl = "http://18.134.186.121/apis/api/payments/"
            this.httpClient.post(apiUrl + 'creditHistory', data)
              .subscribe((res: any) => {
                loading.dismiss();
                // localStorage.setItem('myCreditAmt', );
                if (res.status == false) {
                  this.myCreditAmt = 0
                } else {
                  this.myCreditAmt = parseInt(res.balance)
                }
                if (this.myCreditAmt >= this.flowDetails.promoAmt) {
                  this.directPurchase(this.flowDetails.promoAmt)
                } else {
                  let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.flowDetails.promoAmt, 'creditAmt': this.buyCredit, 'promoValid': true }
                  let navigationExtras: NavigationExtras = {
                    queryParams: {
                      pageData: JSON.stringify(navObj)
                    }
                  }
                  this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowcredit`, navigationExtras);
                }
              }, error => {
              });
          } else {
            // Promocode not applicable for this user
            this.showToast('Promocode not applicable for you')

            let data = new FormData();
            data.append('security_key', '61ea8cb8b2d57930b805104c8a31be6b35cfa4f2');
            data.append('user_id', localStorage.getItem('user_id'));
            var apiUrl = "http://18.134.186.121/apis/api/payments/"
            this.httpClient.post(apiUrl + 'creditHistory', data)
              .subscribe((res: any) => {
                loading.dismiss();
                // localStorage.setItem('myCreditAmt', );
                if (res.status == false) {
                  this.myCreditAmt = 0
                } else {
                  this.myCreditAmt = parseInt(res.balance)
                }
                this.buyCredit = parseInt(this.flowDetails.creditAmt)
                if (this.myCreditAmt >= this.buyCredit) {
                  this.directPurchase(this.buyCredit)
                } else {
                  let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.buyCredit, 'creditAmt': this.buyCredit, 'promoValid': false }
                  let navigationExtras: NavigationExtras = {
                    queryParams: {
                      pageData: JSON.stringify(navObj)
                    }
                  }
                  this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowcredit`, navigationExtras);
                }
              }, error => {
              });
          }
        }, error => {
          loading.dismiss()
        });

    })

  }
  async showToast(msg) {
    let toast = await this.toast.create({
      message: msg,
      duration: 3000,
      position: "top"
    })
    toast.present()
  }
  checkValid() {

    if (!this.loginForm.controls.email.valid && (this.loginForm.controls.email.dirty || this.loginForm.get('email').touched)) {
      this.emailValid = false;
    } else {
      this.emailValid = true;
    }
  }
}
