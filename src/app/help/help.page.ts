import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  shownGroup = false
  shownGroup1 = false
  faqList: any;
  apiUrl = "http://18.134.186.121/apis/api/home/"
  constructor(
    public loadingController: LoadingController,
    public toast: ToastController,
    public httpClient: HttpClient,
    public ss:SocialSharing,
  ) { }

  ngOnInit() {
    this.getFaqs()
  }

  async getFaqs() {

    let data = new FormData();
    data.append('security_key', 'd3d8421b8cb634b721cf061a8be5278ea089ffc5');
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'faqs', data)
        .subscribe((res: any) => {
         
          if (res.status == true) {
            this.faqList = res.data;
          }
          loading.dismiss()
        }, error => {
          loading.dismiss()
        });
    })

  }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    }
    else {
      this.shownGroup = group;
    }
  };

  toggleGroup1(group) {
    if (this.isGroupShown1(group)) {
      this.shownGroup1 = null;
    }
    else {
      this.shownGroup1 = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };
  isGroupShown1(group) {
    return this.shownGroup1 === group;
  };

 async supportEmail(){

const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration:4000
    });
    await loading.present() 
    this.ss.shareViaEmail('', '', ['support@deskapade.co.uk']).then(() => {
      // Success!
      
    }).catch(() => {
      // Error!
    });
   
  }



}
