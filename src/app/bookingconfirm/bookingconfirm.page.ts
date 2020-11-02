import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
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
    public loadingController:LoadingController,
    public modalController: ModalController) {
    this.route.queryParams.subscribe(params => {
      this.bookingData = JSON.parse(params["bookingData"]);
    });
  }

  ngOnInit() {
    this.presentModal()
  }

  home() {
    this.navController.navigateRoot(`/tabs/home`);

  }

  review() {
    this.navController.navigateRoot(`/review`);

  }

  credit() {
    this.navController.navigateRoot(`/tabs/credit`);

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
    this.ss.share("","","",encodeURI(this.bookingData.booking_pdf)).then(() => {
      // Success!
      
    }).catch(() => {
      // Error!
    });
  }
}
