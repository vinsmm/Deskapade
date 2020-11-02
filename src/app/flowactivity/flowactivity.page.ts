import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MyeventService } from 'src/myevent/myevent.service';
@Component({
  selector: 'app-flowactivity',
  templateUrl: './flowactivity.page.html',
  styleUrls: ['./flowactivity.page.scss'],
})
export class FlowactivityPage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/payments/';
  historyArr = [];
  myCredit;
  constructor(private navController: NavController, private router: Router,
    private loadingController: LoadingController,
    public toast: ToastController,
    public httpClient: HttpClient,
    public event: MyeventService) { }

  ngOnInit() {
    this.getDetails()
  }


  activity() {
    // this.navController.navigateRoot(`/flowcredit`);
    this.navController.pop()

  }
  async getDetails() {
    let data = new FormData();
    data.append('security_key', '61ea8cb8b2d57930b805104c8a31be6b35cfa4f2');
    data.append('user_id', localStorage.getItem('user_id'));

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'creditHistory', data)
        .subscribe((res: any) => {
          if (res.status == true) {
            this.historyArr = res.data;
            this.myCredit = res.balance;
            if (this.myCredit.length <= 0) {
              this.myCredit = 0
            }

          } else {
            this.showToast(res.message)
            this.myCredit = 0
          }
          loading.dismiss()
        }, error => {
          loading.dismiss()
        });

    })

  }
  booking() {
    this.navController.navigateRoot(`/bookingconfirm`);

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
