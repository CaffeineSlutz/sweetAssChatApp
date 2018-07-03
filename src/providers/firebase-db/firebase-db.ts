import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let item of items | async">
        {{ item.name }}
      </li>
    </ul>
  `
})
export class FirebaseDbProvider {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  path: string = '';
  constructor(public http: HttpClient, private afs: AngularFirestore) {
    if (this.path.length > 1) {
      this.itemsCollection = afs.collection<Item>(this.path);
      this.items = this.itemsCollection.valueChanges();
    } else {
      console.log('WARNING Need to define a path in the firebase-db provider!');
    }
  }
  addItem(item: Item) {
    this.itemsCollection.add(item);
  }
}
