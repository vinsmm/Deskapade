import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CalendarComponentOptions, CalendarModalOptions, CalendarModal } from 'ion2-calendar';

@Component({
  selector: 'app-bookagain',
  templateUrl: './bookagain.page.html',
  styleUrls: ['./bookagain.page.scss'],
})
export class BookagainPage implements OnInit {
  searchForm: FormGroup;
  dateRange: { from: string; to: string; };
  dateMulti: string[];
  date
  type: 'string';
  showToggleButtons
  time;
  myCreditAmt; buyCredit;
  credits;
  durationArr = []

  eventSource: any;
  month: any;
  year: any;
  str3;
  vendorData;
  hours;
  persons = '';
  valildDurationFlag = false;
  notes = ""; bookingtime; showApplyFlag = false; promocode = ''; promoAppliedFlag = false; promoAmt;
  constructor(public formBuilder: FormBuilder,
    private navController: NavController,
    private router: Router,
    private route: ActivatedRoute,
    public httpClient: HttpClient,
    public toast: ToastController,
    private loadingController: LoadingController,
    public modalCtrl: ModalController) {
    this.route.queryParams.subscribe(params => {
      this.vendorData = JSON.parse(params["vendorData"])
    });
    this.searchForm = this.formBuilder.group({
      date: '',

    });

  }
  ngOnInit() {
    // this.getVendorDetailById()
    this.str3 = ""//localStorage.getItem('entDate');
    this.time = "" //localStorage.getItem('stime');
    this.hours = this.vendorData.booking_hours
    this.persons = this.vendorData.total_persons//localStorage.getItem('persons')
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
    var entered_hours = this.vendorData.booking_hours//parseInt(localStorage.getItem("min_hours"));
    var entered_persons = this.vendorData.total_persons//parseInt(localStorage.getItem('persons'));

    var hoursParam = Math.ceil(entered_hours / parseInt(this.vendorData.booking_hours));
    var personParam = Math.ceil(entered_persons / parseInt(this.vendorData.max_persons))

    if (hoursParam <= personParam) {
      this.credits = parseInt(this.vendorData.fix_price) * personParam
    } else {
      this.credits = parseInt(this.vendorData.fix_price) * hoursParam
    }

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
      if (result.data != undefined) {
        var splitedDate = result.data.string.split("-")
        this.date = splitedDate[2]//result.data.date
        this.month = splitedDate[1]//result.data.months
        this.year = splitedDate[0]//result.data.years
        this.str3 = this.date + '-' + this.month + '-' + this.year;
      }

    });
  }

  //Check Booking Availability
  async checkAvailable() {
    if (this.str3.length && this.time.length) {
      let data = new FormData();
      data.append('security_key', '3067a0df625299b7128407c74a9e2c63a8b25c8c');
      data.append('booking_id', this.vendorData.id);
      data.append('booking_date', this.str3)
      data.append('booking_time', this.time.substring(11, 16))
      data.append('type_id', this.vendorData.booking_type)
      data.append('vendor_id', this.vendorData.vendor_id);
      data.append('booking_hours', this.vendorData.booking_hours)
      var apiUrl = "http://18.134.186.121/apis/api/home/"
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',

      });
      await loading.present().then(() => {
        this.httpClient.post(apiUrl + 'checkBookingAvailable', data)
          .subscribe((res: any) => {
            var sTime = this.time.substring(11, 16); var eTime = parseInt(this.time.substring(11)) + parseInt(this.vendorData.booking_hours);
            if (eTime > 23) {
              this.showToast('Time Exceeding ')
              this.valildDurationFlag = false;
              this.bookingtime = ""
            } else {
              this.bookingtime = sTime + "-" + eTime + ":" + this.time.substring(14, 16)
              this.valildDurationFlag = true;
            }
            loading.dismiss()
          }, error => {
            loading.dismiss()
          });

      })
    }
  }
  async checkPromoValid() {
    if (this.valildDurationFlag == true) {
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
              // this.confirmBooking()// logged in user + promocode\
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
                    let navObj = {
                      'fromPage': 'bookagain', 'amount': this.credits, 'type_id': this.vendorData.booking_type, 'wallet_Amount': this.myCreditAmt,
                      'user_id': localStorage.getItem('user_id'), 'vendor_id': this.vendorData.vendor_id,
                      'booking_date': this.str3, 'booking_time': this.time.substring(11, 16), 'booking_hours': this.hours,
                      'total_persons': this.persons, 'total_amt': this.credits, 'addition_notes': localStorage.getItem('notes'),
                      'credit_type': "debit", 'promoAmt': this.promoAmt, 'creditAmt': this.buyCredit, 'promoApplied': true, 'promoValid': true
                    }
                    // let navObj = { 'fromPage': 'bookagain', 'wallet_Amount': this.myCreditAmt,  }
                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                        pageData: JSON.stringify(navObj)
                      }
                    }
                    this.navController.navigateForward(`/tabs/upcomingbooking/flowcredit`, navigationExtras);
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
                  this.buyCredit = this.credits
                  if (this.myCreditAmt >= this.buyCredit) {
                    this.directPurchase(this.buyCredit)
                  } else {
                    let navObj = {
                      'fromPage': 'bookagain', 'amount': this.credits, 'type_id': this.vendorData.booking_type, 'wallet_Amount': this.myCreditAmt,
                      'user_id': localStorage.getItem('user_id'), 'vendor_id': this.vendorData.vendor_id,
                      'booking_date': this.str3, 'booking_time': this.time.substring(11, 16), 'booking_hours': this.hours,
                      'promoAmt': this.buyCredit, 'creditAmt': this.buyCredit, 'promoApplied': false, 'promoValid': false,
                      'total_persons': this.persons, 'total_amt': this.credits, 'addition_notes': localStorage.getItem('notes'),
                      'vendorloc_id': localStorage.getItem('vendorloc_id'), 'credit_type': "debit"
                    }
                    // let navObj = { 'fromPage': 'bookagain', 'wallet_Amount': this.myCreditAmt, }
                    let navigationExtras: NavigationExtras = {
                      queryParams: {
                        pageData: JSON.stringify(navObj)
                      }
                    }
                    this.navController.navigateForward(`/tabs/upcomingbooking/flowcredit`, navigationExtras);
                  }
                }, error => {
                });
            }
          }, error => {
            loading.dismiss()
          });

      })
    } else {
      this.showToast('Please select valid date and time')
    }
  }
  //proceed to book the venue from rebooking 
  async confirmBooking() {
    if (this.valildDurationFlag == true) {
      localStorage.setItem('notes', this.notes)
      var loggedin = localStorage.getItem('loggedIn')
      localStorage.setItem('creditAmt', this.credits)
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
            this.buyCredit = this.credits;
            if (this.myCreditAmt >= this.buyCredit) {

              this.directPurchase(this.buyCredit)
            } else {
              let navObj = {
                'fromPage': 'bookagain',
                'amount': this.credits,
                'type_id': this.vendorData.booking_type,
                'wallet_Amount': this.myCreditAmt,
                'user_id': localStorage.getItem('user_id'),
                'vendor_id': this.vendorData.vendor_id,
                'booking_date': this.str3,
                'booking_time': this.time.substring(11, 16),
                'booking_hours': this.hours,
                'total_persons': this.persons,
                'total_amt': this.credits,
                'addition_notes': localStorage.getItem('notes'),
                'credit_type': "debit",
                'promoAmt': this.buyCredit,
                'creditAmt': this.buyCredit,
                'promoApplied': false,
                'promoValid': false,
                'vendorloc_id': localStorage.getItem('vendorloc_id')
              }
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  pageData: JSON.stringify(navObj)
                }
              };
              this.navController.navigateForward(`/tabs/upcomingbooking/flowcredit`, navigationExtras);
            }

          }, error => {
            loading.dismiss()
          });

      })


    } else {
      this.showToast('Please select valid date and time')
    }
  }

  async directPurchase(credit) {
    let data = new FormData();

    data.append('security_key', 'b4e123dee8c4be95847b2f870c33c423d3653866');
    data.append('amount', credit);
    data.append('type_id', this.vendorData.booking_type)
    data.append('user_id', localStorage.getItem('user_id'))
    data.append('vendor_id', this.vendorData.vendor_id)
    data.append('booking_date', this.str3)
    data.append('booking_time', this.time.substring(11, 16))
    data.append('booking_hours', this.hours)
    data.append('total_persons', this.persons)
    data.append('total_amt', credit)
    data.append('addition_notes', localStorage.getItem('notes'))
    data.append('credit_type', "debit")
    data.append('total_amt', credit)
    data.append('promo_code', this.promocode);
    data.append('vendorloc_id', localStorage.getItem('vendorloc_id'))
    var apiUrl = "http://18.134.186.121/apis/api/payments/"
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(apiUrl + 'directBooking', data)
        .subscribe((res: any) => {
          loading.dismiss()
          let navObj = res.data[0]
          let navigationExtras: NavigationExtras = {
            queryParams: {
              bookingData: JSON.stringify(navObj)
            }
          }
          this.navController.navigateForward('/tabs/upcomingbooking/bookingconfirm', navigationExtras)

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
    this.buyCredit = this.credits
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