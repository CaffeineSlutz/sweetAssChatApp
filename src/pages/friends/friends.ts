import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})

export class FriendsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams, private afs: AngularFirestore){
  }
}
