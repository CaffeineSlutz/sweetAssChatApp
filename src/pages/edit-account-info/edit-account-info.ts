import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {AccountPage} from "../account/account";
import {NotificationsPage} from "../notifications/notifications";
import {FriendsPage} from "../friends/friends";
import {LogoutPage} from "../logout/logout";

/**
 * Generated class for the EditAccountInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-account-info',
  templateUrl: 'edit-account-info.html',
})
export class EditAccountInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountInfoPage');
  }

}
