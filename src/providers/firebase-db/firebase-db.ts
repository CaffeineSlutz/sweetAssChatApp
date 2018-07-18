import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/debounceTime';
import { HttpClient } from '@angular/common/http';

export interface Item { content: string; }

@Injectable()
export class FirebaseDbProvider {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  users: any = [];
  friends: any =[];

  constructor(public http: HttpClient, private afs: AngularFirestore) {
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
    this.afs.collection('users').doc(user.userid).set(user);
  }

  addThread(threadObject:Object){
    this.afs.collection('thread').add(threadObject);
  }

  getCurrentUser(){
    //console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser;

  }

  // getCurrentUser(){
  //   this.afs.doc('users/' + this.getCurrentUser().uid).collection('friends')
  //
  //   console.log(firebase.auth().currentUser, "what you wanna see");
  //   return firebase.auth().currentUser;
  // }
  createThread(Thread){
    // this.afs.collection('thread').add(Thread);//this adds the thread to the database
  }
  createFriend(friend){
    this.afs.collection('users').add(friend);
  }
  
  addFriendToCollection(friendsUID) {
    let curUser = this.getCurrentUser();
    let friendsDB = this.afs.collection(`users/${curUser.uid}/friends`).ref;
    friendsDB.onSnapshot(snapshot => {
      snapshot.forEach(element => {
        console.log(element.exists);
      });
    })
  }
  filterUsers(searchTerm){
    return this.users.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }
}
