import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router'; 
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  @Input() booking_id: string;
  rate=1;
  comments='';
  
  constructor(private navController: NavController,
     public httpClient: HttpClient,
     public alertController:AlertController,
     private loadingController: LoadingController,
     public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('booking id', this.booking_id)
  }
  home() {
	    this.navController.navigateRoot(`/tabs/home`);

  }
  onRateChange(event) {
    console.log('Your rate:', event);
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
	
    });
	// this.navController.navigateRoot(`/tabs/home`);
  }
 async submitReview(){
    console.log(this.rate, this.comments)
    let data = new FormData();

    data.append('security_key', '2342dc42fd705c1d1004971a4b34109453cc7bd2');
    data.append('booking_id',this.booking_id);
    data.append('rating', this.rate.toString())
    data.append('user_id', localStorage.getItem('user_id'))
    data.append('feedback', this.comments)
    var apiUrl = "http://18.134.186.121/apis/api/users/"
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(apiUrl + 'userFeedback', data)
        .subscribe((res: any) => {
          console.log(res);
          if(res.status==true){
           this.showThanks()
          }
          // let navObj = res.data[0]
          // let navigationExtras: NavigationExtras = {
          //   queryParams: {
          //     bookingData: JSON.stringify(navObj)
          //   }
          // }
          // this.navController.navigateForward('/tabs/home/list/amenity/detailtwo/flowlogin/bookingconfirm', navigationExtras)
          loading.dismiss()
        }, error => {
          loading.dismiss()
        });

    })
  }
 async showThanks(){
   
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Thank You for',
      subHeader: 'your feedback',
      // message: 'This is an alert message.',
      // buttons: [
      //     {
      //     text: 'Ok',
      //     handler: () => {
      //       this.modalCtrl.dismiss({
      //         'dismissed': true,
      //       });
      //     }
      //   }
      // ]
    });

    await alert.present();
    setTimeout(()=>{
      alert.dismiss();
      this.modalCtrl.dismiss({
                'dismissed': true,
              });
  }, 2000);
  }
}
