import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items;
  constructor(public navCtrl: NavController,
              public afd : AngularFireDatabase) {
  this.getDataFromFirebase()
  }

  getDataFromFirebase(){
    this.afd.list('/Dumbie/').valueChanges().subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.items = data;
      }
    )
  }
}
