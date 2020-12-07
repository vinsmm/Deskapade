import { Component, OnInit, NgZone } from '@angular/core';
import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MyeventService } from 'src/myevent/myevent.service';

@Component({
  selector: 'app-flowcredit',
  templateUrl: './flowcredit.page.html',
  styleUrls: ['./flowcredit.page.scss'],
})

export class FlowcreditPage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/payments/';
  segmentModel = "one";
  buyCredit;
  minCredit;
  userId;
  loggedIn;
  paymentInfo;
  myCreditAmt; directBookingFlag = false;
  flowDetails; subscription;
  constructor(private navController: NavController, private router: Router,
    public alert: AlertController,
    public event: MyeventService,
    public loadingController: LoadingController,
    public toast: ToastController,
    private route: ActivatedRoute,
    public platform: Platform,
    public zone: NgZone,
    public httpClient: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.flowDetails = JSON.parse(params["pageData"])
    });
  }

  async ngOnInit() {
    this.loggedIn = localStorage.getItem('loggedIn');
    this.myCreditAmt = this.flowDetails.wallet_Amount;
    if (this.flowDetails.promoValid == true) {
      this.buyCredit = Math.round(this.flowDetails.promoAmt);
    } else {
      this.buyCredit = Math.round(this.flowDetails.creditAmt);
    }
    //parseInt(localStorage.getItem('creditAmt'))
    if (this.myCreditAmt >= this.buyCredit) {
      var newbuyCredit = Math.round(this.myCreditAmt - this.buyCredit);
      this.buyCredit = 0;
      this.directPurchase(newbuyCredit)
    } else if (this.myCreditAmt < this.buyCredit) {
      this.buyCredit =Math.round(this.buyCredit - this.myCreditAmt);

    }
    this.minCredit=this.buyCredit
    // let data = new FormData();
    // data.append('security_key', '61ea8cb8b2d57930b805104c8a31be6b35cfa4f2');
    // data.append('user_id', localStorage.getItem('user_id'));
    // var apiUrl = "http://18.134.186.121/apis/api/payments/"
    // const loading = await this.loadingController.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Please wait...',

    // });
    // await loading.present().then(() => {
    //   this.httpClient.post(apiUrl + 'creditHistory', data)
    //     .subscribe((res: any) => {
    //       loading.dismiss()
    //       this.zone.run(() => {

    //         if (res.status == false) {
    //           this.myCreditAmt = 0
    //         } else {
    //           this.myCreditAmt = parseInt(res.data[0].total_credits)
    //         }
    //         this.buyCredit = parseInt(localStorage.getItem('creditAmt'))
    //         if (this.myCreditAmt >= this.buyCredit) {
    //           var newbuyCredit = this.myCreditAmt - this.buyCredit;
    //           this.buyCredit = 0;
    //           this.directPurchase(newbuyCredit)
    //         } else if (this.myCreditAmt < this.buyCredit) {
    //           this.buyCredit = this.buyCredit - this.myCreditAmt;

    //         } else {

    //         }

    //         if (isNaN(this.buyCredit)) {
    //           this.buyCredit = 10
    //         }
    //         this.userId = localStorage.getItem('user_id');
    //         this.minCredit = this.buyCredit;


    //       })

    //     }, error => {
    //       loading.dismiss()
    //     });

    // })

  }
  // ionViewDidEnter() {
  //   this.subscription = this.platform.backButton.subscribe(() => {
  //     this.navController.navigateBack('/tabs/home/list/amenity/detailtwo')
  //   });
  //   this.loadInfo()
  // }
  // ionViewWillLeave() {
  //   this.subscription.unsubscribe();
  // }  
  // async loadInfo(){

  // }
  directPurchase(newcreditAmt) {

  }
  segmentChanged(event) {

  }
  goback() {
    // this.navController.navigateBack('/tabs/home/list/amenity/detailtwo')
  }
  booking() {
    this.navController.navigateRoot(`/bookingconfirm`);

  }
  decrement() {
    console.log(this.buyCredit,"    ", this.minCredit)
    if (this.buyCredit > this.minCredit) {
      this.buyCredit--;
    } else {

    }
  }
  increment() {
    this.buyCredit++
  }
  async purchaseCredit() {
    const confirm = await this.alert.create({
      header: "Proceed to purchase " + this.buyCredit + " credits",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Buy Now',
          handler: () => {
            this.buyCredits()
            // this.navController.navigateRoot('/tabs/home')
          }
        }
      ]
    })
    await confirm.present();
  }
  activity() {
    if (this.flowDetails.fromPage == "bookagain") {
      this.navController.navigateForward('/tabs/upcomingbooking/flowcredit/flowactivity')
    } else {
      this.navController.navigateForward(`/tabs/home/list/amenity/detailtwo/flowcredit/flowactivity`);
    }


  }
  async buyCredits() {
    this.flowDetails.amount = this.buyCredit
    this.flowDetails.total_amt = this.buyCredit;
    this.flowDetails.wallet_Amount = this.myCreditAmt
    if (this.flowDetails.fromPage == "bookagain") {
      let navObj = this.flowDetails
      let navigationExtras: NavigationExtras = {
        queryParams: {
          paymentInfo: JSON.stringify(navObj)
        }
      }
      this.navController.navigateForward([`/tabs/upcomingbooking/flowcredit/stripay`], navigationExtras);
    } else if (this.flowDetails.fromPage == "flowregister") {
      let navObj = { 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt, 'promoAmt': this.flowDetails.promoAmt, 'creditAmt': this.flowDetails.creditAmt, 'promoApplied': this.flowDetails.promoApplied, 'promocode': this.flowDetails.promocode }
      let navigationExtras: NavigationExtras = {
        queryParams: {
          paymentInfo: JSON.stringify(navObj)

        }
      }
      this.navController.navigateForward([`/tabs/home/list/amenity/detailtwo/flowcredit/stripay`], navigationExtras);

    } else {
      // let navObj = { 'user_id': this.userId, 'buyCredit': this.buyCredit, 'fromPage': 'normal', 'wallet_Amount': this.myCreditAmt }
      let navigationExtras: NavigationExtras = {
        queryParams: {
          paymentInfo: JSON.stringify(this.flowDetails)

        }
      }
      this.navController.navigateForward([`/tabs/home/list/amenity/detailtwo/flowcredit/stripay`], navigationExtras);
    }
    // let data = new FormData();
    // data.append('security_key', '8963727757d3ef494d0f8f67ece209a7b2dac5a4');
    // data.append('user_id', this.userId);
    // data.append('credits',this.buyCredit);
    // data.append('credit_type','credit');

    // const loading = await this.loadingController.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Please wait...',

    // });
    // await loading.present().then(() => {
    //   this.httpClient.post(this.apiUrl + 'addCredits', data)
    //     .subscribe((res: any) => {
    //     
    //       if (res.status == true) {
    //       this.showToast(res.message);

    //       }
    //       loading.dismiss()
    //     }, error => {
    //       loading.dismiss()
    //     });
    // })
  }
  loginnow() {
    localStorage.setItem('logintype', 'forced')
    this.navController.navigateRoot('/login');

  }
  goBack() {
    this.navController.navigateRoot(`/tabs/home/list/amenity/detailtwo`);
    // this.navController.pop()
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
