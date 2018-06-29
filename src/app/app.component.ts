import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
<<<<<<< HEAD
import {NotificationsPage} from "../pages/notifications/notifications";
import {FriendsPage} from "../pages/friends/friends";
import {LogoutPage} from "../pages/logout/logout";
import {AccountPage} from "../pages/account/account";
import {EditAccountInfoPage} from "../pages/edit-account-info/edit-account-info";
=======
import { NotificationsPage } from "../pages/notifications/notifications";
import { FriendsPage } from "../pages/friends/friends";
import { LogoutPage } from "../pages/logout/logout";
import { AccountPage } from "../pages/account/account";
import { AccountEditPage } from '../pages/account-edit/account-edit';
>>>>>>> 2fd9e61eda00bd17a2aae9fdf048f7f97804bb31
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage},
      { title: 'Notifications', component: NotificationsPage},
      { title: 'Friends', component: FriendsPage},
      { title: 'Account', component: AccountPage},
<<<<<<< HEAD
      { title: 'Log Out', component: LogoutPage},
      { title: 'Edit Account', component: EditAccountInfoPage},
      { title: 'Login', component: LoginPage}
=======
      { title: 'AccountEdit', component: AccountEditPage},
      { title: 'Logout', component: LogoutPage},
      { title: 'Login', component: LoginPage},
      { title: 'Welcome', component: WelcomePage}
>>>>>>> 2fd9e61eda00bd17a2aae9fdf048f7f97804bb31
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
