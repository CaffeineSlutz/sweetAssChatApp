import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { Message } from '../../interfaces/message';
import {User} from "../../interfaces/user";
import {FirebaseProviderWithInjectableDecProvider} from "../../providers/firebase-provider-with-injectable-dec/firebase-provider-with-injectable-dec";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: User;
  searchTerm: string = '';
  users: any;
  searchControl: FormControl;
  searching: any = false;

  constructor(public navCtrl: NavController, public fdp: FirebaseProviderWithInjectableDecProvider) {
    this.searchControl = new FormControl();
    this.createNewMessage('this is a test message');
  }
  ionViewDidLoad() {

    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

      this.searching = false;
      this.setFilteredItems();


    });
    this.fdp.getUsers().subscribe(users => {
      this.fdp.users = users;
      console.log(users)

    })
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {

    this.users = this.fdp.filterItems(this.searchTerm);

  }
  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  createNewMessage(textMessage: string) {
    let currentUser = this.fdp.getCurrentUser();
    console.log(currentUser);
    let today = new Date();
    const msg: Message = {
      authorName: 'billy',
      authorEmail: 'billybob@mail.com',
      read: false,
      message: textMessage,
      dateReadable: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
      timeReadable: `${today.getHours()}:${today.getMinutes()}`,
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDay(),
      hour: today.getHours(),
      minute: today.getMinutes()
    }

  }
  addFriendToFriendArray() {

  }

}
