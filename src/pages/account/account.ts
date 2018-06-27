import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import {HomePage} from "../home/home";
// import {NotificationsPage} from "../notifications/notifications";
// import {FriendsPage} from "../friends/friends";
// import {LogoutPage} from "../logout/logout";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// reactive form https://ionicframework.com/docs/developer-resources/forms/
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  user = {
    firstName: 'Megan',
    lastName: 'Muirhead',
    email: 'megan@s56.net',
    displayName: 'megaboty',
    number: '801-471-8218',
    address: '123 your mom lane',
    city: 'Lehi',
    state: 'Utah',
    gender: 'female'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // used for an example of ngFor and navigation
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
