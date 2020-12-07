import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-guestlogin',
  templateUrl: './guestlogin.page.html',
  styleUrls: ['./guestlogin.page.scss'],
})
export class GuestloginPage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/users/';
  segmentModel = "one";
  registerForm: FormGroup; flowDetails
  constructor(public httpClient: HttpClient, private navController: NavController,
    private router: Router,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public toast: ToastController) {
    this.route.queryParams.subscribe(params => {
      this.flowDetails = JSON.parse(params["pageData"])
    });
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      number: [''],
    })


  }

  ngOnInit() {
    
  }

  booking() {
    this.navController.navigateForward(`/login/guestlogin/guestcrerdit`);

  }
  async submitForm() {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     email: 'vinod@thedataduck.com',
    //     user_id: 48,
    //     frompage:'guestlogin'
    //   }
    // }
    // this.navController.navigateForward(['/tabs/home/list/amenity/detailtwo/flowlogin/verifycode'], navigationExtras);
    let data = new FormData();
    data.append('security_key', 'b5af77f7785e794345a87e0f0734a11d301c772e');
    data.append('first_name', this.registerForm.value.firstname);
    data.append('last_name', this.registerForm.value.lastname);
    data.append('email', this.registerForm.value.email);
    data.append('user_phone', this.registerForm.value.number);
    data.append('is_guest', '0');
    // let loader = this.loadingCtrl.create({
    //   });  
    // loader.present();
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'userSignup', data)
        .subscribe((res: any) => {
          
          localStorage.setItem('user_id', res.data.userid);
          localStorage.setItem('user_email',this.registerForm.value.email)
          loading.dismiss()

          if (res.status == true) {
            var navObj = {
              'creditAmt': this.flowDetails.creditAmt,
              'fromPage': "guestlogin",
              'promoAmt': this.flowDetails.promoAmt,
              'promoApplied': true,
              'promocode': this.flowDetails.promocode,
              'email': this.registerForm.value.email,
              'user_id': res.data.userid,
            }
            if (this.flowDetails.promoApplied == true) {
              this.checkValidPromo(navObj)
            } else {
              let navObj = {
                'creditAmt': this.flowDetails.creditAmt,
                'fromPage': "guestlogin",
                'promoAmt': this.flowDetails.promoAmt,
                'promoApplied': false,
                'promocode': this.flowDetails.promocode,
                'email': this.registerForm.value.email,
                'user_id': res.data.userid,
              }
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  flowData: JSON.stringify(navObj)
                }
              }
              // this.navController.navigateForward(['/tabs/home/list/amenity/detailtwo/flowlogin/verifycode'], navigationExtras);
              this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/guestcrerdit`, navigationExtras);
            }
          }else{
              this.showToast(res.message)
          }
          

        }, error => {
          loading.dismiss()
          this.showToast(error)
        });
    })
  }
  async checkValidPromo(navObj) {
    var userId=navObj.user_id
    let data = new FormData();
    data.append('security_key', 'b20be5c19392f899fbd870dfc85f180a98ffa2bd');
    data.append('promo_code', navObj.promocode);
    data.append('user_email', navObj.email);
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
            let navObj = {
              'creditAmt': this.flowDetails.creditAmt,
              'fromPage': "guestlogin",
              'promoAmt': this.flowDetails.promoAmt,
              'promoApplied': true,
              'promocode': this.flowDetails.promocode,
              'email': this.registerForm.value.email,
              'user_id':userId,
            }
         
            if(navObj.promoAmt==0){
                this.directPurchase(navObj)
            }else{
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  flowData: JSON.stringify(navObj)
                }
              }
              // this.navController.navigateForward(['/tabs/home/list/amenity/detailtwo/flowlogin/verifycode'], navigationExtras);
              this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/guestcrerdit`, navigationExtras);
            }
          } else {
            // Promocode not applicable for this user
            let navObj = {
              'creditAmt': this.flowDetails.creditAmt,
              'fromPage': "guestlogin",
              'promoAmt': this.flowDetails.promoAmt,
              'promoApplied': false,
              'promocode': this.flowDetails.promocode,
              'email': this.registerForm.value.email,
              'user_id': userId,
            }
            this.showToast('Promocode not applicable for you')
            let navigationExtras: NavigationExtras = {
              queryParams: {
                flowData: JSON.stringify(navObj)
              }
            }
            // this.navController.navigateForward(['/tabs/home/list/amenity/detailtwo/flowlogin/verifycode'], navigationExtras);
            this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin/guestcrerdit`, navigationExtras);

          }
        }, error => {
          loading.dismiss()
        });

    })
  }
 async directPurchase(navObj){
    let data = new FormData();

    data.append('security_key', 'b4e123dee8c4be95847b2f870c33c423d3653866');
    data.append('amount', navObj.promoAmt);
    data.append('type_id', localStorage.getItem('venue_type'))
    data.append('user_id', localStorage.getItem('user_id'))
    data.append('vendor_id', localStorage.getItem('vendor_id'))
    data.append('booking_date', localStorage.getItem('entDate'))
    data.append('booking_time', localStorage.getItem('stime'))
    data.append('booking_hours', localStorage.getItem('min_hours'))
    data.append('user_email', localStorage.getItem('user_email'))
    data.append('promo_code', navObj.promocode);
    data.append('total_persons', localStorage.getItem('persons'))
    data.append('total_amt',navObj.promoAmt)
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
       
          // localStorage.setItem('myCreditAmt', newbuyCredit);
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
  async showToast(msg) {
    let toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: "top"
    })
    toast.present()
  }
}
