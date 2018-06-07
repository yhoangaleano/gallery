import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-list-routes',
  templateUrl: 'list-routes.html'
})
export class ListRoutesPage {
  applicationDirectory = '';
  applicationStorageDirectory = '';
  dataDirectory = '';
  cacheDirectory = '';
  externalApplicationStorageDirectory = '';
  externalDataDirectory = '';
  externalCacheDirectory = '';
  externalRootDirectory = '';
  tempDirectory = '';
  getFreeDiskSpace: any = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fileCtrl: File
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListRoutesPage');

    this.applicationDirectory = this.fileCtrl.applicationDirectory;
    this.applicationStorageDirectory = this.fileCtrl.applicationStorageDirectory;
    this.dataDirectory = this.fileCtrl.dataDirectory;
    this.cacheDirectory = this.fileCtrl.cacheDirectory;
    this.externalApplicationStorageDirectory = this.fileCtrl.externalApplicationStorageDirectory;
    this.externalDataDirectory = this.fileCtrl.externalDataDirectory;
    this.externalCacheDirectory = this.fileCtrl.externalCacheDirectory;
    this.externalRootDirectory = this.fileCtrl.externalRootDirectory;
    this.tempDirectory = this.fileCtrl.tempDirectory;
    this.fileCtrl.getFreeDiskSpace().then(data => {
      this.getFreeDiskSpace = data;
    });
  }

}
