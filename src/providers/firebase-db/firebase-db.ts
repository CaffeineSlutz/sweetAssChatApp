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
