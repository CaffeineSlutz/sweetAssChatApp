
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase } from 'angularfire2/database'
import {WelcomePage} from "../welcome/welcome";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Rx";
import {map} from "rxjs/operators";

export interface Dumbie{
  name: string;
}
export interface DumbieId{
  id: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items;
  private playerCollection:AngularFirestoreCollection<Dumbie>;

  players: Observable<any>;
  constructor(db: AngularFirestore, public navCtrl: NavController,) {
    this.playerCollection = db.collection<Dumbie>('dumbie');

    this.players = this.playerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Dumbie;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  saveName(player: DumbieId){
    this.playerCollection.doc(player.id).set(player);

  }

  welcomePage(){
    this.navCtrl.push(WelcomePage);
  }
}
