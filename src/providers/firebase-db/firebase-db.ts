import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

<<<<<<< HEAD

@Injectable()
=======
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
>>>>>>> f385dd43609b7a453c727f00e7d67f9e47b1adeb
export class FirebaseDbProvider {
  itemsCollection: AngularFirestoreCollection<Item>
  items: Observable<Item[]>
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('dumbie')
    this.items = this.itemsCollection.valueChanges();
    this.getData();
  }
  getData(){
    return this.items.subscribe(items => {
      console.log(items);
    });
  }
}
