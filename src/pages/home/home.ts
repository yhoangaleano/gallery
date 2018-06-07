import { Component } from '@angular/core';
import {
  NavController,
  ActionSheetController,
  ToastController,
  Platform,
  LoadingController,
  Loading
} from 'ionic-angular';

import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  externalRootDirectory: string = null;
  dir_name : string = 'ImagesProject/';

  lastImage: string = null;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private filetransfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController
  ) {

    this.externalRootDirectory = this.file.externalRootDirectory + this.dir_name;

  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar fuente de imagen',
      buttons: [
        {
          text: 'Cargar desde la Biblioteca',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar la Cámara',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  /*

  currentName: toma el nombre actual de la imagen de la ruta
  correctPath: Obtenga solo el camino a la imagen sin el nombre
  copyFileToLocalDir: copie de la ruta actual a nuestra aplicación y use un nuevo nombre de createFileName

  */

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then(
      imagePath => {
        // Special handling for Android library
        if (
          this.platform.is('android') &&
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        ) {

          console.log('imagePath', imagePath);

          this.filePath.resolveNativePath(imagePath).then(filePath => {
            console.log('filePath', filePath);

            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);

            console.log('correctPath', correctPath);

            let currentName = imagePath.substring(
              imagePath.lastIndexOf('/') + 1,
              imagePath.lastIndexOf('?')
            );

            console.log('currentName', currentName);

            this.copyFileToLocalDir(
              correctPath,
              currentName,
              this.createFileName()
            );
          });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);

          console.log('currentName', currentName);

          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);

          console.log('correctPath', correctPath);

          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        }
      },
      err => {
        this.presentToast('Error al seleccionar la imagen.');
      }
    );
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';

      console.log('newFileName', newFileName);

    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {

    console.log('namePath', namePath);
    console.log('currentName', currentName);
    console.log('newFileName', newFileName);

    console.log('cordova.file.dataDirectory', cordova.file.dataDirectory);
    console.log(' this.externalRootDirectory', this.externalRootDirectory);


    this.file
      .copyFile(namePath, currentName, this.externalRootDirectory, newFileName)
      .then(
        success => {
          this.lastImage = newFileName;

          console.log('lastImage', this.lastImage);
          console.log('newFileName', newFileName);

        },
        error => {
          this.presentToast('Error al guardar el archivo.');
        }
      );
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      console.log('cordova.file.dataDirectory + img', (cordova.file.dataDirectory + img));
      return this.externalRootDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = 'http://192.168.0.22/uploadPhotos/upload.php';

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    console.log('targetPath', targetPath);

    // File name only
    var filename = this.lastImage;

    console.log('filename', filename);

    var options = {
      fileKey: 'file',
      fileName: filename,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { fileName: filename }
    };

    const fileTransfer: FileTransferObject = this.filetransfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });

    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(
      data => {
        console.log('data', data);
        this.loading.dismissAll();
        this.presentToast('Imagen cargada exitosamente.');
      },
      err => {
        this.loading.dismissAll();
        this.presentToast('Error al cargar el archivo.');
      }
    );
  }

}
