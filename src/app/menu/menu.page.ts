import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { MyeventService } from 'src/myevent/myevent.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  loggedIn;subscription;
  constructor(private navController: NavController,
    public zone: NgZone,
    public platform: Platform,
    private router: Router, public alert: AlertController,
    public event: MyeventService) { }

  ngOnInit() {
    this.zone.run(() => {
      this.loggedIn = localStorage.getItem('loggedIn');
      this.event.getObservable().subscribe((data) => {
        console.log(data)
        localStorage.setItem('loggedIn', 'false')
        this.loggedIn = localStorage.getItem('loggedIn');
      })
    })
  }
  ionViewDidEnter() {

    this.subscription = this.platform.backButton.subscribe(() => {
      this.navController.navigateRoot('/tabs/home')
    });
    this.loggedIn = localStorage.getItem('loggedIn');
      this.event.getObservable().subscribe((data) => {
        console.log(data)
        localStorage.setItem('loggedIn', 'false')
        this.loggedIn = localStorage.getItem('loggedIn');
      })
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  profile() {
    this.navController.navigateForward(`/tabs/menu/profile`);

  }

  help() {
    this.navController.navigateForward(`/tabs/menu/help`);
  }

  term() {
    this.navController.navigateForward(`/tabs/menu/terms`);
  }
  async logout() {
    const confirm = await this.alert.create({
      header: "Confirm Logout!!",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Logout',
          handler: () => {
            let type = localStorage.getItem('venue_type')
            let vendor_id = localStorage.getItem('vendor_id')
            let entDate = localStorage.getItem('entDate')
            let stime = localStorage.getItem('stime')
            let min_hours = localStorage.getItem('min_hours')
            let persons = localStorage.getItem('persons')
            let notes = localStorage.getItem('notes')
            localStorage.clear();
            localStorage.setItem('venue_type',type)
            localStorage.setItem('vendor_id',vendor_id)
            localStorage.setItem('entDate',entDate)
            localStorage.setItem('stime',stime)
            localStorage.setItem('min_hours',min_hours)
            localStorage.setItem('persons',persons)
            localStorage.setItem('notes',notes)
            localStorage.setItem('loggedIn', 'false')
            this.navController.navigateRoot('/tabs/home');
            this.event.publish({ 'loggout': 'loggedout data' })
          }
        }
      ]
    })
    await confirm.present();
  }
  login() {
    localStorage.setItem('logintype', 'menu')
    this.navController.navigateRoot(`/login`);
  }
}
