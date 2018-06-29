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
import {AccountEditPageModule} from "../pages/account-edit/account-edit.module";
import {LoginPageModule} from "../pages/login/login.module";
import {NotificationsPageModule} from "../pages/notifications/notifications.module";
import {LogoutPageModule} from "../pages/logout/logout.module";

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
    AccountEditPageModule,
    FriendsPageModule,
    LoginPageModule,
    NotificationsPageModule,
    LogoutPageModule,
    IonicModule.forRoot(MyApp),
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
