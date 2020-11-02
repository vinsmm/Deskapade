import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { MyeventService } from '../../myevent/myevent.service'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  loggedIn;user_id;userdata;
  apiUrl='http://18.134.186.121/apis/api/users/';
  name;
  email;phone;age;ocupation;company;
  ageArr=[]; empArr=[];
  constructor(private navController: NavController, private router: Router,
    public alert: AlertController,
    public loadingController: LoadingController,
    public toast: ToastController,
    public httpClient: HttpClient,
    public event: MyeventService) {

    this.event.getObservable().subscribe((data) => {
      console.log('Data received', data);
    });
  }

  ngOnInit() {
    this.loggedIn = localStorage.getItem('loggedIn');
    this.user_id=localStorage.getItem('user_id');
    if(this.loggedIn=='true'){
       this.getProfileInfo()
    }
    this.ageArr=[{'ageid':'3','ageGroup':'Below 20'},
    {'ageid':'4','ageGroup':'20-29'},
    {'ageid':'5','ageGroup':'30-39'},
    {'ageid':'6','ageGroup':'40-49'},
    {'ageid':'7','ageGroup':'Above 50'},]
    this.empArr=[{'empid':'1','emp':'Employed'},
    {'empid':'2','emp':'Self-employed'},
    {'empid':'3','emp':'Student'},
   ]
  }

  edit() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        userdata: JSON.stringify(this.userdata)
      }
    };
    this.navController.navigateForward(`/tabs/menu/profile/editprofile`,navigationExtras);

  }
 async getProfileInfo(){
    let data = new FormData();
    data.append('security_key', 'fce68ce51c366128a156a0801b4b7bccb129bcbc');
    data.append('user_id', this.user_id);
   
     
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'userProfile', data)
        .subscribe((res: any) => {
          console.log(res);
          if (res.status == true) {
           this.setData(res.data)
           
          }else{
            this.showToast(res.message)
         }
          loading.dismiss()
        }, error => {
          loading.dismiss()
        });
    })
  }
  setData(data){
    this.userdata=data;
    this.name=this.userdata.first_name+ " "+this.userdata.last_name;
    this.phone=this.userdata.user_phone
    this.email=this.userdata.email;
    this.ocupation=this.userdata.occupation;
    this.age=this.userdata.age;
    for (let i = 0; i < this.ageArr.length; i++) {
        if(this.ageArr[i].ageid==this.userdata.age){
          this.age=this.ageArr[i].ageGroup
        }      
    }
    for (let i = 0; i < this.empArr.length; i++) {
      if(this.empArr[i].empid==this.userdata.occupation){
        this.ocupation=this.empArr[i].emp
      }      
  }
    this.company=this.userdata.company
    console.log(this.userdata);
  }
  loginnow() {
    localStorage.setItem('logintype', 'forced')
    this.navController.navigateRoot('/login');

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
