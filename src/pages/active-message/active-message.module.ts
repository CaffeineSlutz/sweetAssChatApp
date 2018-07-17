import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveMessagePage } from './active-message';

@NgModule({
  declarations: [
    ActiveMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(ActiveMessagePage),
  ],
})
export class ActiveMessagePageModule {}
