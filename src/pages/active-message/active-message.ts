import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFirestore} from "angularfire2/firestore";

/**
 * Generated class for the ActiveMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-active-message',
  templateUrl: 'active-message.html',
})
export class ActiveMessagePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveMessagePage');
  }

  getMessages(){
   let messageRef = this.afs.collection('messages').ref;

  }

}
