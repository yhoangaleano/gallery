import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectsPage } from './projects';
import { IonTextAvatar } from 'ionic-text-avatar';

@NgModule({
  declarations: [
    ProjectsPage,
    IonTextAvatar
  ],
  imports: [
    IonicPageModule.forChild(ProjectsPage),
  ],
})
export class ProjectsPageModule {}
