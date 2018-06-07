import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraGalleryPage } from './camera-gallery';

@NgModule({
  declarations: [
    CameraGalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraGalleryPage),
  ],
})
export class CameraGalleryPageModule {}
