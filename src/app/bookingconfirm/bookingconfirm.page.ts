import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReviewPage } from '../review/review.page'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-bookingconfirm',
  templateUrl: './bookingconfirm.page.html',
  styleUrls: ['./bookingconfirm.page.scss'],
})
export class BookingconfirmPage implements OnInit {
  bookingData;
  constructor(private navController: NavController,
    public route: ActivatedRoute,
    public ss:SocialSharing,
    public alert:AlertController,
    public loadingController:LoadingController,
    public modalController: ModalController) {
    this.route.queryParams.subscribe(params => {
      this.bookingData = JSON.parse(params["bookingData"]);
    });
  }

  ngOnInit() {
    setTimeout(()=>{
      this.presentModal()
    },2000)
  }

  home() {
    this.navController.pop()
    this.navController.navigateRoot(`/tabs/home`,{replaceUrl: true} );

  }

  review() {
    this.navController.navigateRoot(`/review`);

  }

async  credit() {
    
    const confirm = await this.alert.create({
      header: "Do you want to add more credits",
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
            this.navController.navigateRoot(`/tabs/credit`);
          }
        }
      ]
    })
    await confirm.present();

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ReviewPage,
      cssClass: 'newmodel',
      showBackdrop: true,
      componentProps: {
        booking_id: this.bookingData.id
      }
    });
    return await modal.present().then(() => {
      modal.onDidDismiss().then(() => {
      })
    })

  }
  close() {
    this.navController.navigateRoot('/tabs/home')
  }
 async share(){
  //  this.bookingData.booking_pdf
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration:4000
    });
    await loading.present() 
    this.ss.share("Dear Customer, \nThank you for booking with us.\nPlease find your booking details with given link\n","","", this.bookingData.booking_pdf).then(() => {
      // Success!
      
    }).catch((err) => {
      console.log(err)
      // Error!
    });
  }
}
