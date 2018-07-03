import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {WelcomePageModule} from '../pages/welcome/welcome.module';
import {RegistrationPageModule} from '../pages/registration/registration.module';
import {AccountPageModule} from '../pages/account/account.module';
import {FriendsPageModule} from '../pages/friends/friends.module';
import { LoginPageModule } from '../pages/login/login.module';
import { NotificationsPageModule } from '../pages/notifications/notifications.module';
import { LogoutPageModule } from '../pages/logout/logout.module';
import { AngularFireModule } from 'angularfire2';
import { FbAdminConfig } from '../../FbAdminConfig';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    WelcomePageModule,
    RegistrationPageModule,
    AccountPageModule,
    FriendsPageModule,
    LoginPageModule,
    NotificationsPageModule,
    LogoutPageModule,
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
    FirebaseDbProvider
  ]
})
export class AppModule {
}
