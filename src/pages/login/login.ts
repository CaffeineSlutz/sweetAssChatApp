import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import { auth } from "firebase";
import * as firebase from 'firebase/app'
import { Facebook } from '@ionic-native/facebook';
import { HomePage } from "../home/home";
import { User } from '../../interfaces/user';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  displayName;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform,
    private authService: FirebaseDbProvider
  ) {
    afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(authenticated => {
      console.log(authenticated);
      if (authenticated.additionalUserInfo.isNewUser) {
        const newUser:User = {
          name:authenticated.user.displayName,
          emailAddress:authenticated.user.email,
          image:authenticated.user.photoURL,
          userid:authenticated.user.uid
        }
        console.log('saving user');
        this.authService.saveUser(newUser);
      }
    });
  }


  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
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
  }

  continueToApp(displayName){
    this.navCtrl.setRoot(HomePage, {
      name: displayName
    })
  }
}
