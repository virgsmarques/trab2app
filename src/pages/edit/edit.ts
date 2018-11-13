import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/fire-service/fire-service';
import { ToastrServiceProvider } from '../../providers/toastr-service/toastr-service';
import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

    fotoAtual: any;

    animal = {
      'dataPedido': '', 
      'nome':'', // nome da pessoa que efetuou o pedido
      'contato':'', // telefoone para contato 
      'tipoAnimal': '', 
      'sexo': '',
      'endResgate':'', // endereço para resgate
      'descricao': '',
      'fotoAtual': ''
    };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public firebaseService: FirebaseServiceProvider,
              public toastrService: ToastrServiceProvider,
              ) {
      
          this.animal = this.navParams.get('animal');
  }

  update(animal){
      this.firebaseService.update(animal).then(d => { 
        this.toastrService.show('Registro alterado com sucesso!', 3000).present();
          this.navCtrl.setRoot(ListPage);
      });
  }
  // quando alterar registro vibrará
//   vibrate(){
//     this.vibration.vibrate(2000);
//   }
// 
}
