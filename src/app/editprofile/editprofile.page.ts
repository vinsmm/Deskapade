import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/users/';
  profileInfo;
  registerForm: FormGroup;user_id;
  constructor(private navController: NavController,
    private router: Router, private route: ActivatedRoute,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public toast: ToastController,) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      number: ['',],
      age: '',
      empStatus: '',
      campanyName: '',
    })
  }

  ngOnInit() {
    this.user_id=localStorage.getItem('user_id');
    this.route.queryParams.subscribe(params => {
      this.profileInfo = JSON.parse(params["userdata"])
    });
    this.registerForm.controls['firstname'].setValue(this.profileInfo.first_name);
    this.registerForm.controls['lastname'].setValue(this.profileInfo.last_name)
    this.registerForm.controls['email'].setValue(this.profileInfo.email)
    this.registerForm.controls['number'].setValue(this.profileInfo.user_phone)
    this.registerForm.controls['age'].setValue(this.profileInfo.age)
    this.registerForm.controls['empStatus'].setValue(this.profileInfo.occupation)
    this.registerForm.controls['campanyName'].setValue(this.profileInfo.company)

  }
  async updateinfo() {
   let data = new FormData();
    data.append('security_key', 'fce68ce51c366128a156a0801b4b7bccb125fd8y');
    data.append('first_name', this.registerForm.value.firstname);
    data.append('last_name', this.registerForm.value.lastname);
    data.append('email', this.registerForm.value.email);
    data.append('user_phone', this.registerForm.value.number);
    data.append('age', this.registerForm.value.age);
    data.append('occupation', this.registerForm.value.empStatus);
    data.append('company', this.registerForm.value.campanyName);
    data.append('user_id',this.user_id );
     
    
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'updateUserProfile', data)
        .subscribe((res: any) => {
          if (res.status == true) {
            this.navController.navigateRoot("/tabs/menu")
          }
          this.showToast(res.message)
          loading.dismiss()
        }, error => {
          loading.dismiss()
        });
    })

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
