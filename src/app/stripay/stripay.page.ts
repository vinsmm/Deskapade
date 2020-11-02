import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-stripay',
  templateUrl: './stripay.page.html',
  styleUrls: ['./stripay.page.scss'],
})
export class StripayPage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/payments/';
  segmentModel = "one";
  cardvals: FormGroup;
  payinfo; stripetoken;
  creditCardNumber:string;promocode='';
  constructor(public stripe: Stripe,
    public httpClient: HttpClient,
    private navController: NavController,
    private router: Router,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public toast: ToastController,) {
    this.route.queryParams.subscribe(params => {
      this.payinfo = JSON.parse(params["paymentInfo"]);
      console.log(this.payinfo)
      if(this.payinfo.promoApplied==false || this.payinfo.promoValid==false){
        this.promocode=''
      }else{
        this.promocode=this.payinfo.promocode
      }

      console.log(this.promocode);
      
    });
    this.cardvals = this.formBuilder.group({
      crdname:['', [Validators.required, ]],
      crdnum: ['', [Validators.required, ]],
      expmnth: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      expyr: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      cvvnum: ['',Validators.compose([Validators.maxLength(3) ,Validators.pattern('^[0-9]{3,4}$'), Validators.required])],
    })
  }

  ngOnInit() {
//TEST KEY 
this.stripe.setPublishableKey('pk_test_51HNIlVB2ICFaY755wNueNxR9OyPRECqbvJUo4TPkN5TtrSWkres2PvJUHD0b6WCT0vFSvoVvd8aJfWnLiwtKJ4HD00tk3etALQ');
         //  this.stripe.setPublishableKey('pk_live_51HNIlVB2ICFaY755sa11hA4guTIDyBlQ1JfKx9n2TYJwYV6xkO1VA2M36BrQWVroc4Lq3U09JKnZr6dXN8hYqIVk00ey7erPMg');
  }
  formatCard(value: string){
      
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length > 0) {
      this.creditCardNumber = parts.join('-');
    } else {
      this.creditCardNumber = value;
    }
  }
  async validateCard() {
    let crdno=this.creditCardNumber.split('-')

    let card = {
      name: this.cardvals.value.crdname,
      number: crdno[0]+crdno[1]+crdno[2]+crdno[3],//this.cardvals.value.crdnum,
      expMonth: this.cardvals.value.expmnth,
      expYear: this.cardvals.value.expyr,
      cvc: this.cardvals.value.cvvnum
    };
    console.log(card, this.payinfo)
    // Run card validation here and then attempt to tokenise
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.stripe.createCardToken(card)
        .then(token => {
          loading.dismiss()
          this.sendPayDetails(token.id)
          
           
       })
        .catch(error => {
          this.showToast(error);
          loading.dismiss()
        });
    })
  }
  async sendPayDetails(token) {
    if (this.payinfo.fromPage == "bookagain") {
      let data = new FormData();
      data.append('security_key', 'e86256b2787ee7ff0c33d0d4c6159cd922227b79');
      data.append('amount', this.payinfo.amount);
      data.append('tokenId', token);
      data.append('type_id', this.payinfo.type_id)
      data.append('user_id', this.payinfo.user_id)
      data.append('vendor_id', this.payinfo.vendor_id)
      data.append('booking_date', this.payinfo.booking_date)
      data.append('booking_time', this.payinfo.booking_time)
      data.append('booking_hours', this.payinfo.booking_hours)
      data.append('total_persons', this.payinfo.total_persons)
      data.append('total_amt', this.payinfo.amount)
      data.append('addition_notes', this.payinfo.addition_notes)
      data.append('credit_type', this.payinfo.credit_type)
      data.append('wallet_amount', this.payinfo.wallet_Amount);
      data.append('user_email',localStorage.getItem('user_email'));
      data.append('promo_code',this.promocode)
      data.append('vendorloc_id',localStorage.getItem('vendorloc_id'))
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',

      });
      await loading.present().then(() => {
        this.httpClient.post(this.apiUrl + 'payment', data)
          .subscribe((res: any) => {
            console.log(res.data.userid);
            if (res.status == true) {
              this.navigateUser(res.data[0])
              this.showToast("Booking is Confirmed")
            }else{
               this.showToast(res.message)
            }
            loading.dismiss()
          }, error => {
            this.showToast(error)
            loading.dismiss()
          });
      })
    } else if(this.payinfo.fromPage == "mainCredit"){
      var apiUrl='http://18.134.186.121/apis/api/payments/'
      let data = new FormData();
      data.append('security_key', '8963727757d3ef494d0f8f67ece209a7b2dac5a4');
      data.append('credits', this.payinfo.buyCredit);
      data.append('tokenId', token);
      data.append('user_id', localStorage.getItem('user_id'))
      data.append('credit_type', 'credit');
      data.append('wallet_amount', this.payinfo.wallet_Amount);
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',

      });
      await loading.present().then(() => {
        this.httpClient.post(apiUrl + 'addCredits', data)
          .subscribe((res: any) => {
            console.log(res.data.userid);
            if (res.status == true) {
              this.navigateUser(res.data[0])
            }
             this.showToast(res.message)
            loading.dismiss()
          }, error => {
            loading.dismiss()
          });
      })
    }
    else {
      let data = new FormData();
      data.append('security_key', 'e86256b2787ee7ff0c33d0d4c6159cd922227b79');
      data.append('amount', this.payinfo.amount);
      data.append('tokenId', token);
      data.append('type_id', localStorage.getItem('venue_type'))
      data.append('user_id', localStorage.getItem('user_id'))
      data.append('vendor_id',localStorage.getItem('vendor_id'))
      data.append('booking_date', localStorage.getItem('entDate'))
      data.append('booking_time', localStorage.getItem('stime'))
      data.append('booking_hours', localStorage.getItem('min_hours'))
      data.append('total_persons',localStorage.getItem('persons'))
      data.append('total_amt', this.payinfo.amount)
      data.append('addition_notes', localStorage.getItem('notes'))
      data.append('credit_type', 'debit');
      data.append('wallet_amount', this.payinfo.wallet_Amount);
      data.append('user_email',localStorage.getItem('user_email'));
      data.append('promo_code',this.promocode);
      data.append('vendorloc_id',localStorage.getItem('vendorloc_id'))
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',

      });
      await loading.present().then(() => {
        this.httpClient.post(this.apiUrl + 'payment', data)
          .subscribe((res: any) => {
            console.log(res.data.userid);
            if (res.status == true) {
              this.navigateUser(res.data[0])
              this.showToast("Booking is Confirmed")
            }else{
               this.showToast(res.message)
            }
           
            loading.dismiss()
          }, error => {
            this.showToast(error)
            loading.dismiss()
          });
      })
    }
  }
  navigateUser(data) {
    if (this.payinfo.fromPage == "mainCredit") {
      this.navController.navigateRoot('/tabs/credit/activity')
    } else if(this.payinfo.fromPage=="bookagain") {
      let navObj = data
      let navigationExtras: NavigationExtras = {
        queryParams: {
          bookingData: JSON.stringify(navObj)
        }
      }
      this.navController.navigateForward('/tabs/upcomingbooking/flowcredit/stripay/bookingconfirm', navigationExtras)
    }else{
      let navObj = data
      let navigationExtras: NavigationExtras = {
        queryParams: {
          bookingData: JSON.stringify(navObj)
        }
      }
      this.navController.navigateForward('/tabs/home/list/amenity/detailtwo/flowlogin/bookingconfirm', navigationExtras)
    }

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
