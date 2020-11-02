import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CalendarComponentOptions } from 'ion2-calendar'
import { CalendarModal, CalendarModalOptions } from 'ion2-calendar';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { getLocalePluralCase } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-venudetail',
  templateUrl: './venudetail.page.html',
  styleUrls: ['./venudetail.page.scss'],
})
export class VenudetailPage implements OnInit {
  searchForm: FormGroup;
  dateRange: { from: string; to: string; };
  dateMulti: string[];
  date
  type: 'string';
  showToggleButtons
  time;
  myCreditAmt; buyCredit;
  credits;
  durationArr = [];
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };

  optionsRange: CalendarComponentOptions = {
    pickMode: 'range'
  };
  eventSource: any;
  month: any;
  year: any;
  str3;
  vendorData;
  hours;
  persons = '';
  notes = "";
  validRequest = true; bookingAvailableFlag = true; showApplyFlag = false; promocode=""; promoAppliedFlag = false; promoAmt;
  constructor(public formBuilder: FormBuilder,
    private navController: NavController,
    private router: Router,
    private route: ActivatedRoute,
    public httpClient: HttpClient,
    public zone: NgZone,
    public toast: ToastController,
    private loadingController: LoadingController,
    public modalCtrl: ModalController) {
    this.route.queryParams.subscribe(params => {
      this.vendorData = JSON.parse(params["vendorData"])
      console.log(this.vendorData)
    });
    this.searchForm = this.formBuilder.group({
      date: '',

    });

  }
  ngOnInit() {
    // this.getVendorDetailById()
    this.str3 = localStorage.getItem('entDate');
    this.time = localStorage.getItem('stime');
    this.persons = localStorage.getItem('persons');
    this.hours = localStorage.getItem('min_hours')
    this.durationArr = [
      { 'hour': "1", 'hourText': '1hour' },
      { 'hour': "2", 'hourText': '2hours' },
      { 'hour': "3", 'hourText': '3hours' },
      { 'hour': "4", 'hourText': '4hours' },
      { 'hour': "5", 'hourText': '5hours' },
      { 'hour': "6", 'hourText': '6hours' },
      { 'hour': "7", 'hourText': '7hours' },
      { 'hour': "8", 'hourText': '8hours' },
      { 'hour': "9", 'hourText': '9hours' },
      { 'hour': "10", 'hourText': '10hours' },
    ]
    this.calculateCredits()
  }
  calculateCredits() {
    var entered_hours = parseInt(localStorage.getItem("min_hours"));
    var entered_persons = parseInt(localStorage.getItem('persons'));
    var hoursParam = Math.ceil(entered_hours / parseInt(this.vendorData.booking_hours));
    var personParam = Math.ceil(entered_persons / parseInt(this.vendorData.max_persons))
    if (hoursParam <= personParam) {
      this.credits = parseInt(this.vendorData.fix_price) * personParam
    } else {
      this.credits = parseInt(this.vendorData.fix_price) * hoursParam
    }
    localStorage.setItem('creditAmt', this.credits)
  }
  async openCalendar() {

    const options: CalendarModalOptions =
    {
      title: '',
      color: 'primary',
      cssClass: 'calendarcss',
    };
    let myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });

    myCalendar.present();

    myCalendar.onDidDismiss().then((result) => {
      console.log(result)
      var splitedDate = result.data.string.split("-")
      this.date = splitedDate[2]//result.data.date
      this.month = splitedDate[1]//result.data.months
      this.year = splitedDate[0]//result.data.years

      this.str3 = this.date + '-' + this.month + '-' + this.year;
      this.checkbooking()

    });

  }
  async checkbooking() {
    console.log(this.str3, this.time, this.persons, this.hours,);
    var sTime = this.time.substring(0, 2);
    console.log(sTime);

    var eTime = parseInt(this.time.substring(0, 2)) + parseInt(this.hours);

    if (eTime > parseInt(this.vendorData.close_time.substring(0, 2))) {
      console.log(eTime, 'time is greater');
      this.showToast('venue close Time is :' + this.vendorData.close_time);
      this.validRequest = false;
    } else {
      this.validRequest = true;

      var loggedin = localStorage.getItem('loggedIn')
      localStorage.setItem('creditAmt', this.credits)
      console.log(loggedin);

      let data = new FormData();
      data.append('security_key', '33cfc5a2e268ac31586b7a0f9462629d0a842f07');
      data.append('sdate', this.str3);
      data.append('stime', this.time);
      data.append('booking_hours', this.hours);
      data.append('max_persons', this.persons);
      data.append('vendor_id', this.vendorData.vendor_id);
      var apiUrl = "http://18.134.186.121/apis/api/home/"
      // const loading = await this.loadingController.create({
      //   cssClass: 'my-custom-class',
      //   message: 'Please wait...',
      // });
      // await loading.present().then(() => {
      this.httpClient.post(apiUrl + 'checkBookingAgain', data)
        .subscribe((res: any) => {
          // loading.dismiss()
          console.log(res);
          if (res.status == true) {
            this.vendorData.min_hours = res.data[0].min_hours;
            this.bookingAvailableFlag = true;
          } else {
            this.bookingAvailableFlag = false;
          }
          this.showToast(res.message)

        }, error => {
          // loading.dismiss()
        });

      // })

    }
  }
  calcredits() {
    console.log(this.persons);
    // var entered_hours = parseInt(localStorage.getItem("min_hours"));
    // var entered_persons = parseInt(localStorage.getItem('persons'));
    var entered_hours = parseInt(this.hours);
    var entered_persons = parseInt(this.persons);
    var hoursParam = Math.ceil(entered_hours / parseInt(this.vendorData.booking_hours));
    var personParam = Math.ceil(entered_persons / parseInt(this.vendorData.max_persons))
    if (hoursParam <= personParam) {
      this.credits = parseInt(this.vendorData.fix_price) * personParam
    } else {
      this.credits = parseInt(this.vendorData.fix_price) * hoursParam
    }
    this.checkbooking()
  }
  // async login() {

  //   if (this.validRequest == true && this.bookingAvailableFlag==true) {
  //     localStorage.setItem('notes', this.notes)
  //     localStorage.setItem('entDate', this.str3)
  //     localStorage.setItem('persons', this.persons)
  //     localStorage.setItem('stime', this.time)
  //     localStorage.setItem('min_hours', this.hours)
  //     var loggedin = localStorage.getItem('loggedIn')
  //     localStorage.setItem('creditAmt', this.credits)
  //     console.log(loggedin);
  //     if (loggedin == "true") {
  //       let data = new FormData();
  //       data.append('security_key', '61ea8cb8b2d57930b805104c8a31be6b35cfa4f2');
  //       data.append('user_id', localStorage.getItem('user_id'));
  //       var apiUrl = "http://18.134.186.121/apis/api/payments/"
  //       const loading = await this.loadingController.create({
  //         cssClass: 'my-custom-class',
  //         message: 'Please wait...',
  //       });
  //       await loading.present().then(() => {
  //         this.httpClient.post(apiUrl + 'creditHistory', data)
  //           .subscribe((res: any) => {
  //             this.zone.run(() => {
  //               if (res.status == false) {
  //                 this.myCreditAmt = 0
  //               } else { 
  //                 this.myCreditAmt = parseInt(res.balance)             
  //               }
  //               this.buyCredit = parseInt(localStorage.getItem('creditAmt'))
  //               if (this.myCreditAmt >= this.buyCredit) {
  //                 var newbuyCredit = this.myCreditAmt - this.buyCredit;
  //                 this.directPurchase(newbuyCredit)
  //               } else {
  //                 let navObj = { 'fromPage': 'normal','wallet_Amount': this.myCreditAmt  }
  //                 let navigationExtras: NavigationExtras = {
  //                   queryParams: {
  //                     pageData: JSON.stringify(navObj)
  //                   }
  //                 }
  //                 this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowcredit`, navigationExtras);
  //               }
  //             })
  //             loading.dismiss()
  //           }, error => {
  //             loading.dismiss()
  //           });

  //       })

  //     } else {
  //       localStorage.setItem('logintype', 'menu')
  //       this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin`);
  //     }
  //   } else {
  //     this.showToast('Please select valid  Date and Time')
  //   }
  // }
  // async directPurchase(newbuyCredit) {
  //   let data = new FormData();
  //   data.append('security_key', 'b4e123dee8c4be95847b2f870c33c423d3653866');
  //   data.append('amount', this.credits);
  //   data.append('type_id', localStorage.getItem('venue_type'))
  //   data.append('user_id', localStorage.getItem('user_id'))
  //   data.append('vendor_id', localStorage.getItem('vendor_id'))
  //   data.append('booking_date', localStorage.getItem('entDate'))
  //   data.append('booking_time', localStorage.getItem('stime'))
  //   data.append('booking_hours', localStorage.getItem('min_hours'))
  //   data.append('total_persons', localStorage.getItem('persons'))
  //   data.append('total_amt', this.credits)
  //   data.append('addition_notes', localStorage.getItem('notes'))
  //   data.append('credit_type', "debit")
  //   var apiUrl = "http://18.134.186.121/apis/api/payments/"
  //   const loading = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Please wait...',

  //   });
  //   await loading.present().then(() => {
  //     this.httpClient.post(apiUrl + 'directBooking', data)
  //       .subscribe((res: any) => {
  //         console.log(res);
  //         localStorage.setItem('myCreditAmt', newbuyCredit);
  //         let navObj = res.data[0]
  //         let navigationExtras: NavigationExtras = {
  //           queryParams: {
  //             bookingData: JSON.stringify(navObj)
  //           }
  //         }
  //         this.navController.navigateForward('/tabs/home/list/amenity/detailtwo/flowlogin/bookingconfirm', navigationExtras)
  //         loading.dismiss()
  //       }, error => {
  //         loading.dismiss()
  //       });

  //   })

  // }
  checkCode() {
    console.log(this.promocode);
    if (this.promocode.length > 1) {
      this.showApplyFlag = true;
    } else {
      this.showApplyFlag = false;
      this.promoAppliedFlag=false;
    }
  }
  async applyPromo() {
    let data = new FormData();
    data.append('security_key', 'b57d20b76448b865e934f829da54eb89d6aeff03');
    data.append('promo_code', this.promocode);

    var apiUrl = "http://18.134.186.121/apis/api/payments/"
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(apiUrl + 'getPromoCode', data)
        .subscribe((res: any) => {
          loading.dismiss()
          if (res.status == true) {
            this.promoAppliedFlag = true;
            this.promoApplied(res.data[0]);

          } else {
            this.promoAppliedFlag = false;
            this.showToast(res.message);
            this.promoAmt = 0;
          }
        }, error => {
          loading.dismiss()
        });

    })
  }
  promoApplied(data) {
    this.buyCredit = parseInt(localStorage.getItem('creditAmt'))
    console.log(data, 'promo applied ' + this.promoAppliedFlag);
    console.log(this.buyCredit, ' ', parseInt(data.df_amt));

    if (data.is_disc_flat == '2') {
      this.promoAmt = this.buyCredit - parseInt(data.df_amt);
      if (this.promoAmt < 0) {
        this.promoAmt = 0
      }
    } else if (data.is_disc_flat == '1') {
      var per_cal = (this.buyCredit * parseInt(data.df_amt)) / 100;
      this.promoAmt = this.buyCredit - per_cal;
      if (this.promoAmt < 0) {
        this.promoAmt = 0
      }
    }
    console.log(this.promoAmt);

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
              console.log("price should be promocode applied price, ", this.promoAmt);
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
                    let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.promoAmt, 'creditAmt': this.buyCredit, 'promoValid': true, 'promoApplied': this.promoAppliedFlag, 'promocode': this.promocode }
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
    } else {
      localStorage.setItem('logintype', 'menu')
      console.log(this.buyCredit, this.promoAmt);
      let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.promoAmt, 'creditAmt': this.credits, 'promoApplied': this.promoAppliedFlag, 'promocode': this.promocode }
      console.log(navObj);

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
    if (this.validRequest == true && this.bookingAvailableFlag == true) {
    
      console.log(loggedin);
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

              this.buyCredit = parseInt(localStorage.getItem('creditAmt'));
              console.log(this.buyCredit, ' My Credit=>',this.myCreditAmt);
              
              if (this.myCreditAmt >= this.buyCredit) {
                console.log('direct purchase');
                
                this.directPurchase(this.buyCredit)
              } else {
                let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.buyCredit, 'creditAmt': this.buyCredit, 'promoValid': false, 'promoApplied': this.promoAppliedFlag, 'promocode': this.promocode }
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

        console.log(this.buyCredit, this.promoAmt);
        let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.promoAmt, 'creditAmt': this.credits, 'promoApplied': this.promoAppliedFlag, 'promocode': this.promocode }
        let navigationExtras: NavigationExtras = {
          queryParams: {
            pageData: JSON.stringify(navObj)
          }
        }
        this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowlogin`, navigationExtras);
      }
    } else {
      this.showToast('Please select valid  Date and Time')
    }
  }

  async directPurchase(credit) {
    console.log('direct purchsing ', credit);
    let data = new FormData();
    data.append('security_key', 'b4e123dee8c4be95847b2f870c33c423d3653866');
    data.append('amount', credit);
    data.append('type_id', localStorage.getItem('venue_type'))
    data.append('user_id', localStorage.getItem('user_id'))
    data.append('vendor_id', localStorage.getItem('vendor_id'))
    data.append('vendorloc_id',localStorage.getItem('vendorloc_id'))
    data.append('booking_date', localStorage.getItem('entDate'))
    data.append('booking_time', localStorage.getItem('stime'))
    data.append('booking_hours', localStorage.getItem('min_hours'))
    data.append('user_email', localStorage.getItem('user_email'))
    data.append('promo_code', this.promocode);
    data.append('total_persons', localStorage.getItem('persons'))
    data.append('total_amt', credit)
    data.append('addition_notes', localStorage.getItem('notes'))
    data.append('credit_type', "debit")
    var apiUrl = "http://18.134.186.121/apis/api/payments/"
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(apiUrl + 'directBooking', data)
        .subscribe((res: any) => {
          console.log(res);
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
      duration: 3000,
      position: "top"
    })
    toast.present()
  }
}
