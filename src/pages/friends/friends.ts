import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  friend = {
    firstName: 'Megan',
    lastName: 'Muirhead',
    displayName: 'megaboty'
  };
  friend1 = {
    firstName: 'Gabby',
    lastName: 'Reese',
    displayName: 'aangel'
  };
  friend2 = {
    firstName: 'Jacob',
    lastName: 'Boswell',
    displayName: 'linuxninja39'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams ){
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

}
