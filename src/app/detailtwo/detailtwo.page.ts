import { Component, OnInit, NgZone } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-detailtwo',
  templateUrl: './detailtwo.page.html',
  styleUrls: ['./detailtwo.page.scss'],
})
export class DetailtwoPage implements OnInit {
  id
  apiUrl = 'http://18.134.186.121/apis/api/home/';
  addr1
  addr2
  addr3
  addr4
  addr5
  getId: any;
  vendorDetail: any;
  vendorData: any;
  placeName: any;
  miles: any;
  type: any;
  credits: any;
  notes = ""
  myCreditAmt; buyCredit; showApplyFlag = false; promocode=''; promoAppliedFlag = false; promoAmt;
  constructor(public httpClient: HttpClient,
    private navController: NavController,
    private loadingController: LoadingController,
    public toast: ToastController,
    public zone: NgZone,
    private router: Router, public route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.vendorData = JSON.parse(params["vendorData"]);
    });

  }

  ngOnInit() {
    // this.getVendorDetailById()
    this.calculateCredits()
  }

  calculateCredits() {
    var entered_hours = parseInt(localStorage.getItem("min_hours"));
    var entered_persons = parseInt(localStorage.getItem('persons'));
    // var plainCredit=parseInt(this.vendorData.booking_hours)+parseInt(this.vendorData.booking_type)+parseInt(this.vendorData.max_persons);
    var hoursParam = Math.ceil(entered_hours / parseInt(this.vendorData.booking_hours));
    var personParam = Math.ceil(entered_persons / parseInt(this.vendorData.max_persons))

    if (hoursParam <= personParam) {
      this.credits = Math.round(parseInt(this.vendorData.fix_price) * personParam)
    } else {
      this.credits = Math.round(parseInt(this.vendorData.fix_price) * hoursParam)
    }
    localStorage.setItem('creditAmt', this.credits)
  }
  getVendorDetailById() {
    let data = new FormData();
    data.append('security_key', '7ef9c8d85ccee7578ef8c792281914b9e9ab00a3');
    data.append('vendor_id', this.id);

    // let loader = this.loadingCtrl.create({
    //   });  
    // loader.present();
    this.httpClient.post(this.apiUrl + 'serachVendorById', data)
      .subscribe((rdata: any) => {
        this.vendorDetail = rdata.data[0];
        this.placeName = this.vendorDetail.vendor_business;
        this.miles = this.vendorDetail.miles;
        this.type = this.vendorDetail.location_type_name
        this.addr1 = this.vendorDetail.Vendor_addr1
        this.addr2 = this.vendorDetail.Vendor_addr2
        this.addr3 = this.vendorDetail.vendor_town
        this.addr4 = this.vendorDetail.vendor_postcode
        this.addr5 = this.vendorDetail.vendor_country
        this.credits = this.vendorDetail.credit
      }, error => {
      });
  }
  async checkPromoValid() {
    var loggedin = localStorage.getItem('loggedIn')
    if (loggedin == "true" && localStorage.getItem('user_id') !== null) {
      let data = new FormData();
      data.append('security_key', 'b20be5c19392f899fbd870dfc85f180a98ffa2bd');
      data.append('promo_code', this.promocode);
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
                  if (this.myCreditAmt >= this.promoAmt) {
                    this.directPurchase(this.promoAmt)
                  } else {
                    let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.promoAmt, 'creditAmt': this.buyCredit, 'promoValid': true, 'promocode': this.promocode }
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
              this.promoAppliedFlag = false;
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
                  if (this.myCreditAmt >= this.buyCredit) {
                    this.directPurchase(this.buyCredit)
                  } else {
                    let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promocode': this.promocode, 'promoAmt': this.buyCredit, 'creditAmt': this.buyCredit, 'promoValid': false }
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
    } else {
      localStorage.setItem('logintype', 'menu')
      let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.promoAmt, 'creditAmt': this.buyCredit, 'promoApplied': this.promoAppliedFlag, 'promocode': this.promocode }
      let navigationExtras: NavigationExtras = {
        queryParams: {
          pageData: JSON.stringify(navObj)
        }
      }
      this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin`, navigationExtras);
    }
  }
  async confirmBooking() {
    localStorage.setItem('notes', this.notes)
    var loggedin = localStorage.getItem('loggedIn')
    if (loggedin == "true" && localStorage.getItem('user_id') !== null) {
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
            loading.dismiss();

            if (res.status == false) {
              this.myCreditAmt = 0
            } else {
              this.myCreditAmt = parseInt(res.balance)
            }
            this.buyCredit = parseInt(localStorage.getItem('creditAmt'))
            if (this.myCreditAmt >= this.buyCredit) {
              this.directPurchase(this.buyCredit)
            } else {
              let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.buyCredit, 'creditAmt': this.buyCredit, 'promoValid': false, 'promocode': this.promocode }
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  pageData: JSON.stringify(navObj)
                }
              }
              this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowcredit`, navigationExtras);
            }
          }, error => {
            loading.dismiss()
          });
      })
    } else {
      localStorage.setItem('logintype', 'menu')
      let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.promoAmt, 'creditAmt': this.credits, 'promoApplied': this.promoAppliedFlag, 'promocode': this.promocode }
      let navigationExtras: NavigationExtras = {
        queryParams: {
          pageData: JSON.stringify(navObj)
        }
      }
      this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin`, navigationExtras);
    }
  }

  async directPurchase(credit) {
    let data = new FormData();

    data.append('security_key', 'b4e123dee8c4be95847b2f870c33c423d3653866');
    data.append('amount', credit);
    data.append('type_id', localStorage.getItem('venue_type'))
    data.append('user_id', localStorage.getItem('user_id'))
    data.append('vendor_id', localStorage.getItem('vendor_id'))
    data.append('booking_date', localStorage.getItem('entDate'))
    data.append('booking_time', localStorage.getItem('stime'))
    data.append('booking_hours', localStorage.getItem('min_hours'))
    data.append('user_email', localStorage.getItem('user_email'))
    data.append('promo_code', this.promocode);
    data.append('total_persons', localStorage.getItem('persons'))
    data.append('total_amt', credit)
    data.append('addition_notes', localStorage.getItem('notes'))
    data.append('credit_type', "debit")
    data.append('vendorloc_id',localStorage.getItem('vendorloc_id'))
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
  checkCode() {
    if (this.promocode.length > 1) {
      this.showApplyFlag = true;
    } else {
      this.showApplyFlag = false;
      this.promoAppliedFlag = false;
    }
  }
  async applyPromo() {
    let data = new FormData();
    data.append('security_key', 'b57d20b76448b865e934f829da54eb89d6aeff03');
    data.append('promo_code', this.promocode.toUpperCase());

    var apiUrl = "http://18.134.186.121/apis/api/payments/"
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(apiUrl + 'getPromoCode', data)
        .subscribe((res: any) => {
          if (res.status == true) {
            this.promoAppliedFlag = true;
            this.promoApplied(res.data[0]);
          } else {
            this.promoAppliedFlag = false;
            this.showToast(res.message);
            this.promoAmt = 0;
          }
          loading.dismiss()
        }, error => {
          loading.dismiss()
        });

    })
  }
  promoApplied(data) {
    this.buyCredit = parseInt(localStorage.getItem('creditAmt'))
    if (data.is_disc_flat == '2') {
      this.promoAmt = Math.round(this.buyCredit - parseInt(data.df_amt));
      if (this.promoAmt < 0) {
        this.promoAmt = 0
      }
    } else if (data.is_disc_flat == '1') {
      var per_cal = (this.buyCredit * parseInt(data.df_amt)) / 100;
      this.promoAmt = Math.round(this.buyCredit - per_cal);
      if (this.promoAmt < 0) {
        this.promoAmt = 0
      }
    }
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
