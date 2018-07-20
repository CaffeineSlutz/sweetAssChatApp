import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {WelcomePageModule} from '../pages/welcome/welcome.module';
import {AccountPageModule} from '../pages/account/account.module';
import {FriendsPageModule} from '../pages/friends/friends.module';
import {AccountEditPageModule} from '../pages/account-edit/account-edit.module';
import {LoginPageModule} from '../pages/login/login.module';
import {NotificationsPageModule} from '../pages/notifications/notifications.module';
import {LogoutPageModule} from '../pages/logout/logout.module';
import { AngularFireModule } from 'angularfire2';
import { FbAdminConfig } from '../../FbAdminConfig';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { HttpClientModule } from '@angular/common/http';

import { Facebook } from '@ionic-native/facebook';
import {ActiveMessagePage} from "../pages/active-message/active-message";
import {ActiveMessagePageModule} from "../pages/active-message/active-message.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    WelcomePageModule,
    AccountPageModule,
    FriendsPageModule,
    LoginPageModule,
    NotificationsPageModule,
    LogoutPageModule,
    ActiveMessagePageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FbAdminConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseDbProvider,
    Facebook
  ]
})
export class AppModule {
}
