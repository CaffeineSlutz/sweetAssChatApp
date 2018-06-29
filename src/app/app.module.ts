import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {WelcomePageModule} from "../pages/welcome/welcome.module";
import {RegistrationPageModule} from "../pages/registration/registration.module";
import {AccountPageModule} from "../pages/account/account.module";
import {FriendsPageModule} from "../pages/friends/friends.module";
import {LoginPageModule} from "../pages/login/login.module";
import {NotificationsPageModule} from "../pages/notifications/notifications.module";
import {LogoutPageModule} from "../pages/logout/logout.module";
import {EditAccountInfoPageModule} from "../pages/edit-account-info/edit-account-info.module";
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";


// var config = {
//   apiKey: "AIzaSyCVmQTZSgGpRtE6zQ1QyN0tFT6BlACAYmU",
//   authDomain: "sweetasschatapp.firebaseapp.com",
//   databaseURL: "https://sweetasschatapp.firebaseio.com",
//   projectId: "sweetasschatapp",
//   storageBucket: "sweetasschatapp.appspot.com",
//   messagingSenderId: "837514495650"
// };
@NgModule({
  declarations: [
    MyApp,
    HomePage,

  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    WelcomePageModule,
    RegistrationPageModule,
    AccountPageModule,
    FriendsPageModule,
    LoginPageModule,
    NotificationsPageModule,
    LogoutPageModule,
    EditAccountInfoPageModule,
    IonicModule.forRoot(MyApp),
    // AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
