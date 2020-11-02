import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MyeventService } from 'src/myevent/myevent.service';

@Component({
  selector: 'app-guestcrerdit',
  templateUrl: './guestcrerdit.page.html',
  styleUrls: ['./guestcrerdit.page.scss'],
})
export class GuestcrerditPage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/payments/';
  segmentModel = "one";
  buyCredit;
  minCredit;
  userId;
  loggedIn; flowDetails; email
  constructor(private navController: NavController, private router: Router,
    public alert: AlertController,
    public event: MyeventService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public toast: ToastController,
    public httpClient: HttpClient
  ) {
    this.route.queryParams.subscribe(params => {
      this.flowDetails = JSON.parse(params["flowData"]);
      this.email = this.flowDetails.email
    });
  }

  ngOnInit() {
    this.userId = this.flowDetails.user_id;
    if (this.flowDetails.promoApplied == true) {
      this.buyCredit = this.flowDetails.promoAmt
    } else {
      this.buyCredit = this.flowDetails.creditAmt
    }
    this.event.getObservable().subscribe((data) => {
      localStorage.setItem('loggedIn', 'false')
      this.loggedIn = localStorage.getItem('loggedIn');
    })
    // this.buyCredit=parseInt(localStorage.getItem('creditAmt'))
    // this.loggedIn=localStorage.getItem('loggedIn')
    // 

    // if(isNaN(this.buyCredit)){ //typeof(this.buyCredit)!='number' || this.buyCredit.length==undefined
    //   this.buyCredit=10
    // }
    // this.userId=localStorage.getItem('userId');
    this.minCredit = this.buyCredit;

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
    let navObj = { 'fromPage': 'normal', 'user_id': this.userId, 'amount': this.buyCredit, 'promocode': this.flowDetails.promocode, 'email': this.email, 'promoApplied': this.flowDetails.promoApplied }

    let navigationExtras: NavigationExtras = {
      queryParams: {
        paymentInfo: JSON.stringify(navObj)

      }
    }
    this.navController.navigateForward([`/tabs/home/list/amenity/detailtwo/flowcredit/stripay`], navigationExtras);
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
