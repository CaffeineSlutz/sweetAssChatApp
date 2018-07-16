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

  constructor(public http: HttpClient, private afs: AngularFirestore) {
  }

  getUsers(): Observable<any> {
    return this.afs.collection('users').valueChanges();
  }

  saveUser(user:User) {
    this.afs.collection('users').add(user);
  }

  createThread(threadObject:Object){
    this.afs.collection('thread').add(threadObject);
  }

  getCurrentUser(){
    //console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser;
  }
  createFriend(friend){
    this.afs.collection('users').add(friend);
  }
  filterItems(searchTerm){

    return this.users.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }
  // searchCollection(collN:string, )
}
