import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { OneSignal } from '@ionic-native/onesignal/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private oneSignal: OneSignal,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#000000");
      this.splashScreen.hide();
      // this.pushSetup()
    });
  }
  // pushSetup() {
  //   this.oneSignal.startInit('f0d453df-c373-4fcf-9e34-9c4200706ded', '547810512170');

  //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
  //   this.oneSignal.getIds().then((id) => {
  //     console.log(id);
  //     localStorage.setItem('pushToken',id.pushToken);
  //     localStorage.setItem('playerId', id.userId);
  //     });
  //   this.oneSignal.handleNotificationReceived().subscribe(() => {
  //     // do something when notification is received
  //   });

  //   this.oneSignal.handleNotificationOpened().subscribe(() => {
  //     // do something when a notification is opened
  //   });

  //   this.oneSignal.endInit();
  // }
}
