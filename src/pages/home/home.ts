import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseDbProvider} from "../../providers/firebase-db/firebase-db";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private fbService: FirebaseDbProvider) {
  }


  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
}
