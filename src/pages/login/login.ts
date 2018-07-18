import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import { auth } from "firebase";
import * as firebase from 'firebase/app'
import { HomePage } from "../home/home";
import { User } from '../../interfaces/user';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import { map } from 'rxjs/operators';
import {Facebook} from "@ionic-native/facebook";



export interface UserId extends User{
  id: string;
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  displayName;
  private userCollection: AngularFirestoreCollection<User>;
  users: Observable<UserId[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private fb: Facebook,
    private authService: FirebaseDbProvider,
    private afs: AngularFirestore
  ) {

    this.userCollection = afs.collection<User>('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(action => action.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
        this.displayName = null;
        return;
      }
      else{
        this.navCtrl.setRoot(HomePage);
      }
      this.displayName = user.displayName;
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(authenticated => {
      //console.log(authenticated);
      if (authenticated.additionalUserInfo.isNewUser) {
        this.createUser(authenticated);
        // this.afs.collection("users").doc(authenticated.user.uid).collection("Friends").doc("new doc").set({key: "dis bitch value"})

      }
    });
  }

  createUser(auth){
    if (auth.additionalUserInfo.isNewUser){
      const newUser:User = {
        name:auth.user.displayName,
        emailAddress:auth.user.email,
        image:auth.user.photoURL,
        userid:auth.user.uid
      };
      this.authService.saveUser(newUser);
    }
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        this.createUser(facebookCredential);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
  }


  public signOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  continueToApp(displayName){
    this.navCtrl.setRoot(HomePage, {
      name: displayName
    })
  }
}
