import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListRoutesPage } from './list-routes';

@NgModule({
  declarations: [
    ListRoutesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListRoutesPage),
  ],
})
export class ListRoutesPageModule {}
