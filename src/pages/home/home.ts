import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {LoginPage} from '../login/login';
import { AngularFirestore } from 'angularfire2/firestore';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private afs: AngularFirestore, private fdp:FirebaseDbProvider) {
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  createNewMessage(textMessage:string, userUid:string){
    let currentUser = this.fdp.getCurrentUser();
    let today = new Date();
    let messageID:string = currentUser.uid + userUid;
    const msg:Message = {
      messageID:messageID,
      authorName:currentUser.displayName,
      authorEmail:currentUser.email,
      read:false,
      message:textMessage,
      dateReadable:`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
      timeReadable:`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    }
    this.afs.collection('messages').add(msg);
    console.log('message sent to the database!');
  }
}
