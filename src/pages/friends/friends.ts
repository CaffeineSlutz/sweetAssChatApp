import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams, private afs: AngularFirestore){
  }
  // getThreads(messageID?:String):Array<Object> {
  //   let dbColRef = this.afs.collection('threads').ref
  //   let threadArray:Array<Object> = [];
  //   dbColRef.onSnapshot(snapshot => {
  //     snapshot.forEach(doc => {
  //       let dd = doc.data();
  //       if(messageID) {
  //         threadArray.push(dd);
  //       } else {
  //         threadArray.push(dd);
  //       }
  //     })
  //   })
  //   return threadArray
  // }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

}
