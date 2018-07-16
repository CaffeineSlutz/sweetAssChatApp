import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import * as firebase from 'firebase/app'
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class FirebaseProviderWithInjectableDecProvider {

  users: any = [];

  constructor(public http: HttpClient,
              private afs: AngularFirestore) {

  }

  filterItems(searchTerm){

    return this.users.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }
  getUsers(): Observable<any> {
    return this.afs.collection('users').valueChanges();
  }

  saveUser(user:User) {
    this.afs.collection('users').add(user);
  }

  getCurrentUser(){
    console.log(firebase.auth().currentUser);
  }
  createThread(something){
    this.afs.collection('thread').add(something);
  }
  createFriend(friend){
    this.afs.collection('users').add(friend);
  }

}
