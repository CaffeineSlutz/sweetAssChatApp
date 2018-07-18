import { Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import * as firebase from 'firebase/app'
import 'rxjs/add/operator/debounceTime';
import {firestore} from "firebase";

@Injectable()
export class FirebaseDbProvider {
  users: any = [];
  foundUser;
  newThread: any = [];

  constructor(private afs: AngularFirestore) {
  }

  filterItems(searchTerm){

    return this.users.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  addFriendToFriendArray(userid) {
    let obj = {};
    obj[userid] = userid;
    this.afs.doc('users/' + this.getCurrentUser().uid).collection('friends').add(obj);


    // let tempFriendsArray = [];
    // const friend = {
    //   uid:friendsUserid
    // }
    // let dbUserRef = this.afs.collection('users').ref;
    // let user = this.getCurrentUser();
    // dbUserRef.onSnapshot(snapshot => snapshot.forEach(doc => {
    //   //for each document inside of the snapshot
    //   let dd = doc.data();
    //   //console.log(dd);
    //
    //   tempFriendsArray = dd.friends;
    //   console.log("tempFriendsArray:");
    //   console.log(tempFriendsArray);
    //
    //   if (dd.userid === friendsUserid) {
    //
    //     friend.uid = friendsUserid;
    //   }
    // }))
    // dbUserRef.doc(user.uid).update({friends:[].push(friend)});
    //
    //
    // let userRef = firestore().collection('users');
    //
    // userRef.where('name', '==', friendsUserid.value).get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       console.log(snapshot);
    //
    //       this.foundUser = doc.data();
    //       this.newThread.userCol.id.push(this.foundUser.userid);
    //       this.afs.createThread(this.newThread.userCol);
    //       console.log(doc.id, '=>', doc.data());
    //     });
    //   }).catch(err => {
    //   console.log(err)
    // });


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
