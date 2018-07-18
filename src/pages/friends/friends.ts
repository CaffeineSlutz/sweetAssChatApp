import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {AngularFirestore} from "angularfire2/firestore";
import { FormControl } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})

export class FriendsPage {
  friends: any;
  users: any;
  searchTerm: string = '';
  users:Array<Object>;
  searchControl:FormControl;
  searching:boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afs: AngularFirestore,
              private fdp:FirebaseDbProvider){
    this.searchControl = new FormControl();

  }


  ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.setFilteredItems();
    });
    this.fdp.getUsers().subscribe(users => {
      this.fdp.users = users;
      // console.log(users);
    })
    console.log('ionViewDidLoad FriendsPage');
  }

  toggleSearch(){
    this.showSearch = !this.showSearch;
  }

  setFilteredItems() {
    this.users = this.fdp.filterUsers(this.searchTerm);
  }
  showFriend(friend){
    console.log('working');
    this.fdp.showFriendFromCollection(friendid);
  }
}
