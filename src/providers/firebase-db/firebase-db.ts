import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Item { content: string; }

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li *ngFor="let item of items | async">
        {{ item.stuff }}
      </li>
    </ul>
  `
})
export class FirebaseDbProvider {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('dumbie');
    this.items = this.itemsCollection.valueChanges();
    this.getData();
  }
  getData(){
    return this.items.subscribe(items => {
      console.log(items);
    });
  }
}
