import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { Message } from '../../interfaces/message';
import { User } from "../../interfaces/user";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {AngularFirestore} from "angularfire2/firestore";
import { Thread } from '../../interfaces/Thread';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  searchTerm: string = '';
  users:Array<Object>;
  searchControl:FormControl;
  searching:boolean = false;
  activeMessages:Array<String> = [];

  showSearch: boolean = false;

  constructor(public navCtrl: NavController, private afs: AngularFirestore, private fdp:FirebaseDbProvider) {
    this.searchControl = new FormControl();
    this.getMessages();
  }
  ionViewDidLoad() {

    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
    this.fdp.getUsers().subscribe(users => {
      this.fdp.users = users;
      // console.log(users);
    })
  }

  onSearchInput() {
    this.searching = true;
  }

  toggleSearch(){
    this.showSearch = !this.showSearch;
  }

  setFilteredItems() {
    this.users = this.fdp.filterUsers(this.searchTerm);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  addFriend(friend:User){
    this.fdp.addFriendToCollection(friend);
  }

  createChat(threadTitle?:string){
    let randomID:string = this.afs.createId.toString();
    if (!threadTitle) {threadTitle = 'chat';}
    const thread:Thread = {
      threadTitle: threadTitle,
      messageID: randomID
    }
    this.fdp.createThread(thread);
    // this.fdp.addFriendsToThread()// this is where i left off at 4 AM

  }

  getMessages(){}
}
