import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFirestore} from "angularfire2/firestore";
import {FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {Message} from "../../interfaces/message";

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

  public sent = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fdp:FirebaseDbProvider,
              private afs: AngularFirestore)
  {

    let curUserId = this.fdp.getCurrentUser().uid;
    let messageRef = this.afs.collection('messages').ref;
    messageRef.where('messageID', '==', curUserId).onSnapshot(snapshot => {
      this.sent = [];
      snapshot.forEach(doc => {
        this.sent.push(doc.data());
        console.log(this.sent);
      })
    })
  }


  ionViewDidLoad() {

  }

  newMessage(message){
    let curUser = this.fdp.getCurrentUser().uid;
    this.fdp.createNewMessage(message.value, curUser);
    console.log(message.value);
  }
}
