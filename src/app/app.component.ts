import { Component, ViewChild } from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FriendsPage } from "../pages/friends/friends";
import { LogoutPage } from "../pages/logout/logout";
import { LoginPage } from '../pages/login/login';
import {AngularFireAuth} from "angularfire2/auth";
import {ActiveMessagePage} from "../pages/active-message/active-message";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public afAuth: AngularFireAuth,
              public menuCtrl: MenuController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Messages', component: HomePage},
      { title: 'Friends', component: FriendsPage},
      { title: 'Logout', component: LogoutPage},
      { title: 'Active', component: ActiveMessagePage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeMenu(){
    this.menuCtrl.close();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}
