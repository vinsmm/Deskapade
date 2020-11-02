import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MyeventService } from 'src/myevent/myevent.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/payments/';
  segmentModel = "one";
  buyCredit = 10;
  minCredit = 1;
  userId;
  loggedIn; subscription
  constructor(private navController: NavController, private router: Router,
    public alert: AlertController,
    public event: MyeventService,
    public platform: Platform,
    public loadingController: LoadingController,
    public toast: ToastController,
    public httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.event.getObservable().subscribe((data) => {
      localStorage.setItem('loggedIn', 'false')
      this.loggedIn = localStorage.getItem('loggedIn');
    })
    // this.buyCredit=parseInt(localStorage.getItem('creditAmt'))?
    if (isNaN(this.buyCredit)) { //typeof(this.buyCredit)!='number' || this.buyCredit.length==undefined
      this.buyCredit = 10
    }
    this.userId = localStorage.getItem('user_id');
  }
  ionViewDidEnter() {
    this.loggedIn = localStorage.getItem('loggedIn')
    this.subscription = this.platform.backButton.subscribe(() => {
      this.navController.navigateRoot('/tabs/home')
    });
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  segmentChanged(event) {

  }

  booking() {
    this.navController.navigateRoot(`/bookingconfirm`);

  }
  decrement() {
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
    this.navController.navigateRoot(`/tabs/credit/activity`);
  }
  async buyCredits() {
    let navObj = { 'user_id': this.userId, 'buyCredit': this.buyCredit, 'fromPage': 'mainCredit' }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        paymentInfo: JSON.stringify(navObj)

      }
    }
    this.navController.navigateForward('/tabs/credit/stripay', navigationExtras)
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
    //         // this.navController.navigateForward(`/tabs/credit`);
    //         // this.navController.navigateForward(`/verifycode`);
    //       }
    //       loading.dismiss()
    //     }, error => {
    //       loading.dismiss()
    //     });
    // })
  }
  async dbCredit(amt) {
    this.buyCredit = amt
    const confirm = await this.alert.create({
      header: "Proceed to purchase " + amt + " credits",
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
            let navObj = { 'user_id': this.userId, 'buyCredit': amt, 'fromPage': 'mainCredit' }
            let navigationExtras: NavigationExtras = {
              queryParams: {
                paymentInfo: JSON.stringify(navObj)

              }
            }
            this.navController.navigateForward('/tabs/credit/stripay', navigationExtras)
            // this.navController.navigateRoot('/tabs/home')
          }
        }
      ]
    })
    await confirm.present();

  }
  loginnow() {
    localStorage.setItem('logintype', 'forced')
    this.navController.navigateRoot('/login');

  }
  goBack() {
    this.navController.pop()
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
