import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/fire-service/fire-service';
import { EditPage } from '../edit/edit';
import { ToastrServiceProvider } from '../../providers/toastr-service/toastr-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {c
  private animais;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public dbService: FirebaseServiceProvider,
              public firebaseService: FirebaseServiceProvider,
              public toastrService: ToastrServiceProvider
  ) {
      this.animais =   this.dbService.getAll(); 
  }

  // showConfirm(){
  //   const confirm = this.alertCtrl.create({
  //     title: 'Confirmar exclusão',
  //     message: 'Você deseja apagar esse registro? Lembrando que uma vez excluído não se pode mais restaurar!',
  //     buttons: [
  //       {
  //         text: 'Discordo',
  //         handler: () => {
  //           console.log('Discordo escolhido');
  //         }
  //       },
  //       {
  //         text: 'Concordo',
  //         handler: () => {
  //           const options = this.delete(this.animal);            
  //           console.log('Registro deletado');
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

  delete(animal){
    this.firebaseService.delete(animal).then(d => {
      this.toastrService.show('Registro excluído com sucesso!', 3000).present();
        this.navCtrl.setRoot(ListPage);
    })
  }

  editar(animal){
      this.navCtrl.push(EditPage,{
          'animal': animal
      });
  }
}

  