import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAccountInfoPage } from './edit-account-info';

@NgModule({
  declarations: [
    EditAccountInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAccountInfoPage),
  ],
})
export class EditAccountInfoPageModule {}
