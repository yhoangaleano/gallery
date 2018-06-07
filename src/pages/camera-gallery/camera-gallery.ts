import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-camera-gallery',
  templateUrl: 'camera-gallery.html'
})
export class CameraGalleryPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private transfer: FileTransfer
  ) {}

  ionViewDidLoad() {
    console.log(this.file.externalRootDirectory);
    console.log('ionViewDidLoad CameraGalleryPage');
  }

  tomarFotos(){
    this.navCtrl.push(HomePage);
  }

  infoDirectorios(){
    this.navCtrl.push('ListRoutesPage');
  }

  createFolder() {
    let link = 'url_to_download_file';
    let path = '';
    let dir_name = 'ImagesProject'; // directory to download - you can also create new directory
    let file_name = 'file.txt'; //any file name you like

    const fileTransfer: FileTransferObject = this.transfer.create();
    let result = this.file.createDir(
      this.file.externalRootDirectory,
      dir_name,
      true
    );
    result.then(
      resp => {
        path = resp.toURL();
        console.log(path);
        fileTransfer.download(link, path + file_name).then(
          entry => {
            console.log('download complete: ' + entry.toURL());
          },
          error => {
            console.log(error);
          }
        );
      },
      err => {
        console.log('error on creating path : ' + err);
      }
    );
  }
}
