import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { MyeventService } from 'src/myevent/myevent.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-upcomingbooking',
  templateUrl: './upcomingbooking.page.html',
  styleUrls: ['./upcomingbooking.page.scss'],
})
export class UpcomingbookingPage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/home/';
  segmentModel = "one"; loggedIn; upcomingBookingArr = []; pastBookingArr = [];subscription
  constructor(private navController: NavController, private router: Router,
    private loadingController: LoadingController,
    public toast: ToastController,
    public httpClient: HttpClient,
    public platform:Platform,
    public alert: AlertController,
    public event: MyeventService) { }

  ngOnInit() {
    this.loggedIn = localStorage.getItem('loggedIn');
    this.event.getObservable().subscribe((data) => {
      console.log(data)
      localStorage.setItem('loggedIn', 'false')
      this.loggedIn = localStorage.getItem('loggedIn');
    })
    this.getbookingHistory()
  }

  segmentChanged(event) {
    console.log(this.segmentModel);
    if (this.segmentModel == 'one') {
      this.getbookingHistory()
    } else if (this.segmentModel == 'two') {
      this.getpastbookings()
    }
  }
  ionViewDidEnter() {
    this.loggedIn=localStorage.getItem('loggedIn')
    this.subscription = this.platform.backButton.subscribe(() => {
      this.navController.navigateRoot('/tabs/home')
    });
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  async getbookingHistory() {
    if (this.loggedIn == 'true') {
      let data = new FormData();
      data.append('security_key', '6fe76228ca78cc3bfc74652f180b5339a56cd74e');
      data.append('user_id', localStorage.getItem('user_id'));

      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',

      });
      await loading.present().then(() => {
        this.httpClient.post(this.apiUrl + 'upcomingBooking', data)
          .subscribe((res: any) => {
            console.log(res);
            if (res.status == true) {
              this.upcomingBookingArr = res.data;
            }else{
              this.showToast(res.message)
           }
            loading.dismiss()
          }, error => {
            loading.dismiss()
          });

      })
    } else {
      this.showToast("Please Login")
    }


  }
 async cancelBooking(item){
    const confirm = await this.alert.create({
      header: "Cancel Booking?!!",
      message:"Confirm cancellation of Booking "+item.vendor_business,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Confirm',
          handler: () => {
             this.confirmCancel(item)
          }
        }
      ]
    })
    await confirm.present();
  }
 async confirmCancel(item){
  
  let data = new FormData();
  data.append('security_key', '827ea474a8d154921e2189cbd92a19555504cb77');
  data.append('book_id', item.id);

  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',

  });
  await loading.present().then(() => {
    this.httpClient.post(this.apiUrl + 'cancelBooking', data)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status == true) {
          this.pastBookingArr = res.data;
          this.getbookingHistory()
        }else{
           this.showToast(res.message)
        }
       
        loading.dismiss()
      }, error => {
        loading.dismiss()
      });

  })
  }
  async getpastbookings() {
    if (this.loggedIn == 'true') {


      let data = new FormData();
      data.append('security_key', '20e90232b1b4982ea65ff5cf2eca3c8417c7de2b');
      data.append('user_id', localStorage.getItem('user_id'));

      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',

      });
      await loading.present().then(() => {
        this.httpClient.post(this.apiUrl + 'pastBooking', data)
          .subscribe((res: any) => {
            console.log(res);
            if (res.status == true) {
              this.pastBookingArr = res.data;
            }else{
              this.showToast(res.message)
           }
            loading.dismiss()
          }, error => {
            loading.dismiss()
          });

      })
    } else {
      this.showToast("Please Login")
    }
  }
  loginnow() {
    localStorage.setItem('logintype', 'forced')
    this.navController.navigateRoot('/login');

  }
  // detail() {
  //     this.navController.navigateRoot(`/tabs/home/amenityone/venudetail`);

  // }
  bookAgain(item){
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        vendorData: JSON.stringify(item)
      }
    };
    this.navController.navigateForward('/tabs/upcomingbooking/bookagain', navigationExtras)
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
