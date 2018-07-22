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
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  searchTerm: string = '';
  users:Array<Object>;
  searchControl:FormControl;
  searching:boolean = false;
  prompt;

  showSearch: boolean = false;

  constructor(public navCtrl: NavController,
    private afs: AngularFirestore,
    public fdp:FirebaseDbProvider,
    public alertCtrl: AlertController) {
      this.searchControl = new FormControl();
      this.createPrompt();
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
    this.fdp.addUserToFriendsCollection(friend);
  }

  createPrompt(){
    this.prompt = this.alertCtrl.create({
      title: 'New Message',
      message: "Please Enter a Chat Name:",
      inputs: [
        {
          name: 'userInput',
          placeholder: 'ChatName'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.createPrompt();
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.fdp.createChat(data.userInput);
          }
        }
      ]
    });
  }
}
