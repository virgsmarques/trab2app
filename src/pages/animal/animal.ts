import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { ToastrServiceProvider } from '../../providers/toastr-service/toastr-service';
import { FirebaseServiceProvider } from '../../providers/fire-service/fire-service';
import * as firebase from 'firebase';

// recurso nativo
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-animal',
  templateUrl: 'animal.html',
})
export class AnimalPage {
  fotoAtual: any;

  animal = {
    'dataPedido': '', 
    'nome':'', // nome da pessoa que efetuou o pedido
    'contato':'', // telefoone para contato 
    'tipoAnimal': '', 
    'sexo': '',
    'endResgate':'', // endereço para resgate
    'statusPedido':'Pendente', // status do pedido: pendente ou atendido
    'descricao': '',
    'fotoAtual': '',
  };

  constructor(public alertCtrl: AlertController, 
              public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: FirebaseServiceProvider,
              public toastrService: ToastrServiceProvider,
              private camera: Camera, ) {

}

defOptions(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType:this.camera.MediaType.PICTURE,
    correctOrientation: true,
    allowEdit: true,
    targetWidth: 100,
    targetHeight: 100
  }
  return options;
}

obterImagem(options: CameraOptions){
  this.camera.getPicture(options)
  .then((imageData) => {
    let base64image = 'data:image/jpeg;base64,' + imageData;
    this.animal.fotoAtual = base64image;
  }, (error) => {
    console.error(error);
  })
  .catch((error) => {
    console.error(error);
  })

}

showConfirm() {
  const confirm = this.alertCtrl.create({
    message: 'Escolher uma ação',
    buttons: [
      {
        text: 'Galeria',
        handler: () => {
          const options = this.defOptions();
          options.sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
          this.obterImagem(options);
        }
      },
      {
        text: 'Camêra',
        handler: () => {
          this.animal.fotoAtual = "";
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true, targetWidth: 100, targetHeight: 100
          }

          // getPicture metodo do plugin
          this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.animal.fotoAtual = base64Image;
          }, (err) => {
            // Handle error
          });
        }
      }
    ]
  });
  confirm.present();
}



  save(animal) {

  this.dbService.save(animal).then(
    response => {
      // ALERT DE QUE FOI SALVO COM SUCESSO
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(response.key);

      imageRef.putString(this.animal.fotoAtual, 'data_url')
        .then(snapshot => {
          console.log(snapshot)
        }, err => {

      })
      // this.showAlert();
      this.toastrService.show('Registro realizado com sucesso!', 3000).present();
      setTimeout(() => {
        this.navCtrl.setRoot(ListPage);  
      }, 300);
    },
    error => {
      // ALERT DE QUE DEU ERRO NA FUNÇÃO
    }
  ), (r => console.log(r));
  }
}