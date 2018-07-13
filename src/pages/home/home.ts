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
    this.createNewMessage('this is a test message');
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  createNewMessage(textMessage:string){
    let currentUser = this.fdp.getCurrentUser();
    console.log(currentUser);
    let today = new Date();
    const msg:Message = {
      authorName:'billy',
      authorEmail:'billybob@mail.com',
      read:false,
      message:textMessage,
      dateReadable:`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
      timeReadable:`${today.getHours()}:${today.getMinutes()}`,
      year:today.getFullYear(),
      month:today.getMonth(),
      day:today.getDay(),
      hour:today.getHours(),
      minute:today.getMinutes()
    }
    
  }
}
