import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import { AngularFirestore } from "angularfire2/firestore";
import { Thread } from '../../interfaces/Thread'
import { LoginPage } from '../login/login';
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
  
  createThread(input:any){
    let collRef = this.afs.collection('users').ref;

    collRef.where('name', '==', input.value).onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        let foundUser = doc.data();
        let thread:Thread;
        thread.threadTitle = "";
        thread.userCol.id.push(foundUser.userid);
        thread.userCol.names.push(foundUser.name);
        this.fdp.createThread(thread);
      })
    });
  }
}
