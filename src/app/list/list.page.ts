import { Component, ElementRef, OnInit, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
declare var google: any;
interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  map: any;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  // @ViewChild('map', { read: ElementRef, static: true }) mapRef: ElementRef;
  currentInfoWindow: any;
  apiUrl = 'http://18.134.186.121/apis/api/home/';
  segmentModel = "list";
  venueList = [];
  vendorData: any;
  lat; long;
  markers = []
  constructor(public httpClient: HttpClient,
    private navController: NavController,
    private router: Router,
    public toast: ToastController,
    public loading: LoadingController,
    public cdr: ChangeDetectorRef,
    public zone: NgZone,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.venueList = JSON.parse(params["venueList"]);
    });

  }
  ngOnInit() {
    this.markers = this.venueList;
  }
  ionViewDidEnter() {

    this.lat = localStorage.getItem('lat');
    this.long = localStorage.getItem('long')
    const location = new google.maps.LatLng(this.lat, this.long);
    const options = {
      center: location,
      zoom: 15,
      animation: 'DROP',
      draggable: true,
      markers: true,
      // scaleControl: true,
      fullscreenControl: false
    }

    setTimeout(() => {
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
      new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter(),
        // icon: ("http://maps.google.com/mapfiles/ms/icons/green-dot.png")
      });
      //  mainmarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
      // this.markers.forEach(element => {
      //   this.createMarker(element.position);
      // });

      for (let i = 0; i < this.markers.length; i++) {
        this.zone.run(() => {
          var LatLng = new google.maps.LatLng(this.markers[i].vendor_lat, this.markers[i].vendor_long);
          const myMarker = new google.maps.Marker({ position: LatLng, title: this.markers[i].vendor_business, map: this.map })
          const contentString = `<div id='clickableItem' style="max-width:400pt" >
          <div  style='float:left;position: relative;
          text-align: center;
          margin-top: 0;
          border-radius: 10px;'>
          <img style='height:100pt;width:100%;vertical-align:bottom;border-radius:10pt' src='` + this.markers[i].photo + `'>
          </div>
          <div style='width: 100%;height: auto;position: absolute;padding: 0px 10px 0 10px;
          bottom: 16px;color:white; z-index:99;'><div style="float:left; width:60%; line-height:1.5; font-size:16px; font-weight: 600">` + this.markers[i].vendor_business + `<div style="font-weight:400; font-size:14px;"> ` + this.markers[i].miles + ` miles
          </div>   </div>
          <div style="float:right; margin-top:0; position:absolute; right:0; bottom:0;"> <p style="float:left; margin:0;">` + this.markers[i].caltulateRate + ` <img style ="vertical-align: sub; margin-left:2px; width:18px; margin-right:9px;  font-size:14px; font-weight:400;" src="./assets/images/icons/credits_white.svg" /></p> 
       
          <img src="./assets/images/icons/chevron-rightwhite.svg" style="margin-top:-1px;"/> </div>
          `

          var infoWindow = new google.maps.InfoWindow({
            content: contentString,

            // myMarker.getTitle()
          });

          google.maps.event.addListener(this.map, "click", function (event) {
            infoWindow.close();
          });
          myMarker.addListener("click", () => {

            if (this.currentInfoWindow == undefined) {
              infoWindow.open(myMarker.getMap(), myMarker);
              this.currentInfoWindow = infoWindow;
            } else if (this.currentInfoWindow != infoWindow) {
              this.currentInfoWindow.close()
              infoWindow.open(myMarker.getMap(), myMarker);
              this.currentInfoWindow = infoWindow
            }
          });
          google.maps.event.addListener(infoWindow, 'domready', () => {
            document.getElementById('clickableItem').addEventListener("click", () => {
              this.zone.run(() => {
                this.getDetails(this.markers[i]);

              })
            })
          })



        })
      }
    }, 1000);
  }
  showDetails(info) {
  }
  async getDetails(item) {
    localStorage.setItem('vendorloc_id',item.vendorloc_id)
    var stime = localStorage.getItem('stime');
    var duration = localStorage.getItem('min_hours');

    let data = new FormData();
    data.append('security_key', '7ef9c8d85ccee7578ef8c792281914b9e9ab00a3');
    data.append('vendor_id', item.vendor_id);
    data.append('vendorloc_id',item.vendorloc_id)
    data.append('stime', stime);
    data.append('duration', duration);
    data.append('lat', this.lat);
    data.append('long', this.long);
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',

      mode: 'ios',
    });
    await loading.present().then(() => {
      this.httpClient.post(this.apiUrl + 'serachVendorById', data)
        .subscribe((res: any) => {
          this.vendorData = res.data[0];
          let navigationExtras: NavigationExtras = {
            queryParams: {
              vendorData: JSON.stringify(this.vendorData)
            }
          };
          // this.router.navigate(['/tabs/home/list/amenity'], navigationExtras);
          this.navController.navigateForward([`/tabs/home/list/amenity`], navigationExtras);
          loading.dismiss()
        }, error => {
          loading.dismiss(error)
        }

        );
    })
  }
  segmentChanged(event) {
    if (event.detail.value == 'map') {
      this.ionViewDidEnter()
    }
  }

  detailin(item) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: item.vendor_id

      }
    }
    this.navController.navigateForward([`/tabs/home/list/amenity`], navigationExtras);

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
