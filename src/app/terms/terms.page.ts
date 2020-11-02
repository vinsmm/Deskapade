import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  apiUrl="http://18.134.186.121/apis/api/home/";
  tncData;
  constructor(
    public loading:LoadingController,
    public toast:ToastController,
    public httpClient:HttpClient,
    
  ) {}

  ngOnInit() {
   this.getTandC()
  }
  async getTandC() {
    let data = new FormData();
    data.append('security_key', '9c926b3e87f028ccf55201b905031d24bb755b41');
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      mode: 'ios',
    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'termsAndConditions', data)
        .subscribe((res: any) => {
            console.log(res.data);
            this.tncData=res.data
          loading.dismiss();
        }, error => {
          loading.dismiss()
        });
    })

  }
 
}
