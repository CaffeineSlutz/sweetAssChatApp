import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/debounceTime';
import { HttpClient } from '@angular/common/http';
import { Thread } from '../../interfaces/Thread';
import { Message } from '../../interfaces/message';

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
    this.afs.collection('users').doc(user.userid).set(user);
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  createThread(thread:Thread) {
    let currentUser = this.getCurrentUser();
    let threadsColRef = this.afs.collection(`threads`).ref;
    let usersColRef = this.afs.collection('users').ref;
    threadsColRef.doc(thread.messageID).set(thread);
    usersColRef.doc(`${currentUser.uid}/threads/${thread.messageID}`).set(thread);
  }
  
  addUserToFriendsCollection(friend:User) {
    let curUser = this.getCurrentUser();
    let friendsColRef = this.afs.collection(`users/${curUser.uid}/friends`).ref;
    
    friendsColRef.doc(friend.userid).set(friend);
  }

  createChat(threadTitle?:string){
    let currentUser = this.getCurrentUser();
    let randomID = this.afs.createId();
    // let currentThread:Array<Object>;
    if (!threadTitle) {threadTitle = 'chat';}
    const thread:Thread = {
      threadTitle: threadTitle,
      messageID: randomID
    }
    this.createThread(thread);
  }

  createNewMessage(textMessage:string, ID:string){
    let currentUser = this.getCurrentUser();
    let today = new Date();
    const msg:Message = {
      messageID:ID,
      authorName:currentUser.displayName,
      authorEmail:currentUser.email,
      read:false,
      message:textMessage,
      dateReadable:`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
      timeReadable:`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    };

    this.afs.collection('messages').add(msg);
    //console.log('message sent to the database!');
  }

  getMessages(threadID:string){}

  filterUsers(searchTerm){
    return this.users.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
