import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';
import {firestore} from "firebase";
import {AngularFirestore} from "angularfire2/firestore";
import {Thread} from '../../interfaces/Thread'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  afs;

  constructor(public navCtrl: NavController,
              private fbp: FirebaseDbProvider,
              public Angularfs: AngularFirestore,
              ) {
    this.afs = Angularfs;
  }


  foundUser;

  newThread: Thread ={
    threadTitle: '',
    userCol: {
      names: [],
      id: []
    }
  };



  addUser(user) {
    let userRef = firestore().collection('users');

    userRef.where('name', '==', user.value).get()
      .then(snapshot => {

        console.log("snapshot: ", snapshot);

        snapshot.forEach(doc => {
          console.log("doc: ", doc);
          //console.log("snapshot: ", snapshot);

          this.foundUser = doc.data();
          this.newThread.userCol.id.push(this.foundUser.userid);
          this.newThread.userCol.names.push(this.foundUser.name);
          this.fbp.createThread(this.newThread);
          console.log(doc.id, '=>', doc.data());
        });
      }).catch(err => {
      console.log(err)

    });
  };
}
