import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import * as firebase from 'firebase/app'

export interface Item { content: string; }

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let item of items | async">
        {{ item.stuff }}
      </li>
    </ul>
  `
})
export class FirebaseDbProvider {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
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
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser;
  }
}
