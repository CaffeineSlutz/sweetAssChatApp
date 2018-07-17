import { Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import * as firebase from 'firebase/app'
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class FirebaseDbProvider {
  users: any = [];

  constructor(private afs: AngularFirestore) {
  }

  filterItems(searchTerm){

    return this.users.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  addFriendToFriendArray(userid) {
    let ojb = {};
    ojb[userid] = userid;
    this.afs.doc('users/' + this.getCurrentUser().uid).collection('friends').add(ojb);
  }

  getUsers(): Observable<any> {

    return this.afs.collection('users').valueChanges();
  }

  saveUser(user:User) {
    this.afs.collection("users").doc(user.userid).set(user);

  }

  getCurrentUser(){

    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser;

  }

  // getCurrentUser(){
  //   this.afs.doc('users/' + this.getCurrentUser().uid).collection('friends')
  //
  //   console.log(firebase.auth().currentUser, "what you wanna see");
  //   return firebase.auth().currentUser;
  // }
  createThread(something){
    this.afs.collection('thread').add(something);
  }
  createFriend(friend){
    this.afs.collection('users').add(friend);
  }
}
