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
    let dbColRef = this.afs.collection(`threads`).ref;
    
    dbColRef.doc(thread.messageID).set(thread);
  }
  getThread(messageID:String) {
    let dbColRef = this.afs.collection('threads').ref
    dbColRef.where('messageID', '==', messageID).onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        
      });
    })
  }

  addFriendsToThread(friend:User, threadID:string) {
    let dbColRef = this.afs.collection('threads').ref;
    dbColRef.doc(threadID).collection('friends').doc(friend.userid).set(friend);
  }
  
  addFriendToCollection(friend:User) {
    let curUser = this.getCurrentUser();
    let friendsColRef = this.afs.collection(`users/${curUser.uid}/friends`).ref;
    
    friendsColRef.doc(friend.userid).set(friend);
  }

  createChat(threadTitle?:string){
    let randomID = this.afs.createId();
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

  getMessages(){}

  filterItems(searchTerm){
    return this.users.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  filterUsers(searchTerm){
    return this.users.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
