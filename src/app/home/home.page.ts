import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ToastController, Platform, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { CalendarModal, CalendarModalOptions } from 'ion2-calendar';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  apiUrl = 'http://18.134.186.121/apis/api/home/';
  searchForm: FormGroup;
  month: any;
  subscription: any;
  year: any;
  str3 = "";
  address = '';
  time = '';
  date = '';
  persons = '';
  typeId = '';
  typeList: any;
  totaltime: any;
  timeToList: string;
  hours = '';
  venueList = []; latFromBck; longFromBck;
  lat; long;
  recommandedArr = []; nolocFlag = false; durationArr = []; autolocation = true;
  constructor(public httpClient: HttpClient,
    public formBuilder: FormBuilder,
    private navController: NavController,
    private router: Router,
    public toast: ToastController,
    public geoloc: Geolocation,
    public platform: Platform,
    public diagnos: Diagnostic,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public openSetting: OpenNativeSettings,
    public modalCtrl: ModalController,
    public loading: LoadingController,
    public natGeo: NativeGeocoder,) {
    this.searchForm = this.formBuilder.group({
      date: '',
    });

  }

  ngOnInit() {
    // this.getLoc()



  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();

    });
    this.str3 = "";
    this.address = '';
    this.time = '';
    this.date = '';
    this.persons = '';
    this.typeId = '';
    this.hours = ''
    this.getLocation();
    this.getTypeList();
    this.durationArr = [
      { 'hour': "1", 'hourText': '1hour' },
      { 'hour': "2", 'hourText': '2hours' },
      { 'hour': "3", 'hourText': '3hours' },
      { 'hour': "4", 'hourText': '4hours' },
      { 'hour': "5", 'hourText': '5hours' },
      { 'hour': "6", 'hourText': '6hours' },
      { 'hour': "7", 'hourText': '7hours' },
      { 'hour': "8", 'hourText': '8hours' },
      { 'hour': "9", 'hourText': '9hours' },
      { 'hour': "10", 'hourText': '10hours' },
    ]
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  getLocationAuto() {
    this.autolocation = true
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.diagnos.isLocationEnabled().then((isAvailable) => {
        if (isAvailable == true) {
          this.zone.run(() => {
            this.getManLoc()
          })
        } else {
          this.startGPS()
        }
        return isAvailable
      })
    } else {
    }
  }

  async getTypeList() {
    let data = new FormData();
    data.append('security_key', 'c0484aaad84ba315bb2c35992f228d16ecadfa59');
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      mode: 'ios',
    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'allTypes', data)
        .subscribe((res: any) => {
          this.typeList = res.data;
          loading.dismiss();
        }, error => {
        });
    })

  }
  getLocation() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.diagnos.isLocationEnabled().then((isAvailable) => {
        if (isAvailable == true) {
          this.zone.run(() => {
            this.getLoc()
          })
        } else {
          this.startGPS()
        }
        return isAvailable
      })
    } else {
    }
  }
  async startGPS() {
    const confirm = await this.alertCtrl.create({
      header: "Please enable GPS!!",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Enable',
          handler: () => {
            this.openSetting.open('location').then((success) => {
              this.zone.run(() => {
                // this.ngOnInit()
                this.getLoc()
              })
            })
          }
        }
      ]
    })
    await confirm.present();
  }
  async getManLoc() {
    // let loading = await this.loading.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Please wait...',
    //   mode: 'ios',
    // })
    // await loading.present().then(() => {

    this.geoloc.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.long = resp.coords.longitude

      localStorage.setItem('lat', this.lat);
      localStorage.setItem('long', this.long);
      this.natGeo.reverseGeocode(this.lat, this.long).then((res: NativeGeocoderResult[]) => {
        this.address = res[0].postalCode;
        var data = new FormData();
        data.append('lat', this.lat);
        data.append('long', this.long);
        data.append('security_key', '8c410c9354e9c59740d8385a820b9adcfa1af5fc');
        data.append('postcode', this.address);
        data.append('type', this.typeId);
        data.append('persons', this.persons);
        data.append('sdate', this.str3);
        data.append('stime', this.timeToList);
        data.append('min_hours', this.hours);
        this.httpClient.post(this.apiUrl + 'recommendedNearYou', data)
          .subscribe((res: any) => {
            // this.loading.dismiss()
            if (res.status == true) {

              this.calculateCredits(res);


            } else {
              this.recommandedArr = [];
            }
            localStorage.setItem('lat', res.lat)
            localStorage.setItem('long', res.long)
          }, error => {
            // loading.dismiss()
          });
      })
    }).catch((error) => { });
    //  })
  }
  calculateCredits(res) {
    this.zone.run(() => {
      this.recommandedArr = res.data.milesData;
      if (this.hours != undefined && this.persons != undefined) {
        var entered_hours = parseInt(this.hours);
        var entered_persons = parseInt(this.persons);
        for (let i = 0; i < this.recommandedArr.length; i++) {
          console.log(this.recommandedArr[i].rate_criteria);
          
          if (this.recommandedArr[i].rate_criteria == '1') {
            var hoursParam = Math.ceil(entered_hours / parseInt(this.recommandedArr[i].booking_hours));
            var personParam = Math.ceil(entered_persons / parseInt(this.recommandedArr[i].max_persons))
            var calculatedRate;
            if (hoursParam <= personParam) {
              calculatedRate = parseInt(this.recommandedArr[i].fix_price) * personParam
            } else {
              calculatedRate = parseInt(this.recommandedArr[i].fix_price) * hoursParam
            }
            this.recommandedArr[i].caltulateRate = calculatedRate.toString()
          } else if (this.recommandedArr[i].rate_criteria == '2') {
            this.recommandedArr[i].caltulateRate = parseInt(this.recommandedArr[i].fix_price);
          } else if (this.recommandedArr[i].rate_criteria == '3') {
            var hoursParam = Math.ceil(entered_hours / parseInt(this.recommandedArr[i].booking_hours));
            var personParam = Math.ceil(entered_persons / parseInt(this.recommandedArr[i].max_persons))
            console.log(hoursParam, personParam);
            var calculatedRate;
            calculatedRate = parseInt(this.recommandedArr[i].fix_price) * (hoursParam * personParam)
            this.recommandedArr[i].caltulateRate = calculatedRate.toString()
          }

        }
      }
    })
  }
  async getLoc() {
    if (this.autolocation == true) {
      this.getManLoc();

    } else {
      this.zone.run(() => {
        let data = new FormData();
        data.append('security_key', '8c410c9354e9c59740d8385a820b9adcfa1af5fc');
        data.append('lat', localStorage.getItem('lat'));
        data.append('long', localStorage.getItem('long'));
        data.append('postcode', this.address);
        data.append('type', this.typeId);
        data.append('persons', this.persons);
        data.append('sdate', this.str3);
        data.append('stime', this.timeToList);
        data.append('min_hours', this.hours);
        this.httpClient.post(this.apiUrl + 'recommendedNearYou', data)
          .subscribe((res: any) => {
            if (res.status == true) {
              this.calculateCredits(res);

            } else {
              this.recommandedArr = [];
            }
            localStorage.setItem('lat', res.lat)
            localStorage.setItem('long', res.long)
          }, error => {
          });
      })
    }
    this.nolocFlag = false;


    // })
  }
  async openCalendar() {
    const options: CalendarModalOptions =
    {
      title: '',
      color: 'primary',
      cssClass: 'calendarcss',
    };
    let myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });

    myCalendar.present();

    myCalendar.onDidDismiss().then((result) => {
      if (result.data != undefined) {
        var splitedDate = result.data.string.split("-")
        this.date = splitedDate[2]//result.data.date
        this.month = splitedDate[1]//result.data.months
        this.year = splitedDate[0]//result.data.years
        this.str3 = this.date + '-' + this.month + '-' + this.year;
        localStorage.setItem('entDate', this.str3)
        this.getLoc()
      }

    });
  }

  list() {
    if (this.address.length <= 2) {
      this.showToast('Please enter Pin Code or Town')
    } else if (this.typeId.length <= 0) {
      this.showToast('Please select Type')
    } else if (this.persons.length <= 0) {
      this.showToast('Please enter Number Of Persons')
    }
    else if (this.str3.length <= 0) {
      this.showToast('Please select Date')
    }
    else if (this.hours.length <= 0) {
      this.showToast('Please select Duration')
    }
    else if (this.timeToList.length <= 0) {
      this.showToast('Please select Start Time')
    }
    else {
      this.searchVenue()
    }

  }
  async searchVenue() {
    this.timeToList = this.time.substring(11, 16)
    let data = new FormData();
    data.append('security_key', 'd343bd765a1a9983e02db230e5270c9f36a641e0');
    data.append('postcode', this.address);
    data.append('type', this.typeId);
    data.append('persons', this.persons);
    data.append('sdate', this.str3);
    data.append('stime', this.timeToList);
    data.append('min_hours', this.hours);
    data.append('lat', localStorage.getItem('lat'));
    data.append('long', localStorage.getItem('long'));
    localStorage.setItem('post_town', this.address)
    localStorage.setItem('venue_type', this.typeId)
    localStorage.setItem('persons', this.persons)
    localStorage.setItem('min_hours', this.hours)
    localStorage.setItem('stime', this.timeToList)
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

      mode: 'ios',
    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'serachVendor', data)
        .subscribe((res: any) => {
          this.venueList = res.data;

          if (this.venueList.length) {
            var entered_hours = parseInt(this.hours);
            var entered_persons = parseInt(this.persons);
            for (let i = 0; i < this.venueList.length; i++) {
              console.log(this.venueList[i].rate_criteria);
              
              if (this.venueList[i].rate_criteria == '1') {
                var hoursParam = Math.ceil(entered_hours / parseInt(this.venueList[i].booking_hours));
                var personParam = Math.ceil(entered_persons / parseInt(this.venueList[i].max_persons))
                var calculatedRate;
                if (hoursParam <= personParam) {
                  calculatedRate = parseInt(this.venueList[i].fix_price) * personParam
                } else {
                  calculatedRate = parseInt(this.venueList[i].fix_price) * hoursParam
                }
                this.venueList[i].caltulateRate = calculatedRate.toString()
              } else if (this.venueList[i].rate_criteria == '2') {
                this.venueList[i].caltulateRate = parseInt(this.venueList[i].fix_price);
              } else if (this.venueList[i].rate_criteria == '3') {
                var hoursParam = Math.ceil(entered_hours / parseInt(this.venueList[i].booking_hours));
                var personParam = Math.ceil(entered_persons / parseInt(this.venueList[i].max_persons))
                console.log(hoursParam, personParam);
                var calculatedRate;
                calculatedRate = parseInt(this.venueList[i].fix_price) * (hoursParam * personParam)
                this.venueList[i].caltulateRate = calculatedRate.toString()
              }
    
            }
            // for (let i = 0; i < this.venueList.length; i++) {
            //   var hoursParam = Math.ceil(entered_hours / parseInt(this.venueList[i].booking_hours));
            //   var personParam = Math.ceil(entered_persons / parseInt(this.venueList[i].max_persons))
            //   var calculatedRate;
            //   if (hoursParam <= personParam) {
            //     calculatedRate = parseInt(this.venueList[i].fix_price) * personParam
            //   } else {
            //     calculatedRate = parseInt(this.venueList[i].fix_price) * hoursParam
            //   }
            //   this.venueList[i].caltulateRate = calculatedRate.toString()
            // }
            let navigationExtras: NavigationExtras = {
              queryParams: {
                venueList: JSON.stringify(this.venueList)
              }
            };
            this.router.navigate(['/tabs/home/list'], navigationExtras);
          } else {
            this.showToast(res.message)
          }
          loading.dismiss()
        }, error => {
          this.showToast('Something went wrong...')
          loading.dismiss()
        }

        );
    })
  }
  checkValid() {
    // restrict number of persons to 100

    let enterdPersons = parseInt(this.persons);
    if (enterdPersons > 1000) {
      this.persons = "1000"

    }
  }
  async getArea() {
    this.autolocation = false;
    if (this.address.length >= 3) {
      this.zone.run(() => {
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 2,
        };
        var data = new FormData();
        this.natGeo.forwardGeocode(this.address, options)
          .then((result: NativeGeocoderResult[]) => {
            this.lat = result[0].latitude;
            this.long = result[0].longitude;
            localStorage.setItem('lat', this.lat);
            localStorage.setItem('long', this.long);
            data.append('lat', this.lat)
            data.append('long', this.long)
            data.append('security_key', '8c410c9354e9c59740d8385a820b9adcfa1af5fc');
            data.append('postcode', this.address);
            data.append('type', this.typeId);
            data.append('persons', this.persons);
            data.append('sdate', this.str3);
            data.append('stime', this.timeToList);
            data.append('min_hours', this.hours);
            this.httpClient.post(this.apiUrl + 'recommendedNearYou', data)
              .subscribe((res: any) => {
                // loading.dismiss()
                if (res.status == true) {
                  this.calculateCredits(res)

                } else {
                  this.recommandedArr = [];
                }
                localStorage.setItem('lat', res.lat)
                localStorage.setItem('long', res.long)
              }, error => {
              });
          })
          .catch((error: any) => {
            this.lat = "";
            this.long = "";
            // localStorage.setItem('lat', this.lat);
            // localStorage.setItem('long', this.long);
            data.append('lat', this.lat)
            data.append('long', this.long)
            data.append('security_key', '8c410c9354e9c59740d8385a820b9adcfa1af5fc');
            data.append('postcode', this.address);
            data.append('type', this.typeId);
            data.append('persons', this.persons);
            data.append('sdate', this.str3);
            data.append('stime', this.timeToList);
            data.append('min_hours', this.hours);
            this.httpClient.post(this.apiUrl + 'recommendedNearYou', data)
              .subscribe((res: any) => {
                // loading.dismiss()
                if (res.status == true) {
                  this.calculateCredits(res);
                } else {
                  this.recommandedArr = [];
                }
                localStorage.setItem('lat', res.lat)
                localStorage.setItem('long', res.long)
              }, error => {
              });
          });
      })
    }
  }
  getType() {
    localStorage.setItem('venue_type', this.typeId)
    this.getLoc()
  }
  getPersons() {
    localStorage.setItem('persons', this.persons)
    this.getLoc()
  }
  getEntTime() {
    this.timeToList = this.time.substring(11, 16)
    localStorage.setItem('stime', this.timeToList)
    this.getLoc()
  }
  getReqHours() {
    localStorage.setItem('min_hours', this.hours)
    this.getLoc()
  }
  async detail(item) {
    localStorage.setItem('vendorloc_id', item.vendorloc_id);
    localStorage.setItem('rate_criteria',item.rate_criteria)
    if (this.address.length <= 2) {
      this.showToast('Please enter Pin Code or Town')
    } else if (this.typeId.length <= 0) {
      this.showToast('Please select Type')
    } else if (this.persons.length <= 0) {
      this.showToast('Please enter Number Of Persons')
    } else if (this.str3.length <= 0) {
      this.showToast('Please select Date')
    } else if (this.hours.length <= 0) {
      this.showToast('Please select Duration')
    } else if (this.timeToList.length <= 0) {
      this.showToast('Please select Start Time')
    }
    else {
      var stime = ''; var duration = ''
      let data = new FormData();
      data.append('security_key', '7ef9c8d85ccee7578ef8c792281914b9e9ab00a3');
      data.append('vendor_id', item.vendor_id)
      data.append('vendorloc_id', item.vendorloc_id)
      data.append('stime', this.timeToList);
      data.append('duration', this.hours);
      data.append('lat', localStorage.getItem('lat'));
      data.append('long', localStorage.getItem('long'));
      const loading = await this.loading.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',

        mode: 'ios',
      });
      await loading.present().then(() => {
        this.httpClient.post(this.apiUrl + 'serachVendorById', data)
          .subscribe((res: any) => {
            if (res.status == true && res.data.length) {
              var item = res.data[0]
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  vendorData: JSON.stringify(item)
                }
              };
              this.router.navigate(['/tabs/home/amenityone'], navigationExtras);

            } else {
              this.showToast(res.message)
            }
            loading.dismiss()
          }, error => {
            loading.dismiss()
          });
      })
    }
  }
  loginin() {
    this.navController.navigateRoot(`/loginmain`);
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
