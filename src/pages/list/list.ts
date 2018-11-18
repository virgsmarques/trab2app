import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/fire-service/fire-service';
import { EditPage } from '../edit/edit';
import { ToastrServiceProvider } from '../../providers/toastr-service/toastr-service';

import firebase from 'firebase';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private animais;

  public animalList: Array<any>; // Is to store the list of animals we’re pulling from Firebase.
  public loadeadAnimalList: Array<any>; 
  public animalRef:firebase.database.Reference; // criação de referencia para puxar do firebase
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public dbService: FirebaseServiceProvider,
              public firebaseService: FirebaseServiceProvider,
              public toastrService: ToastrServiceProvider
  ) {
      this.animais =   this.dbService.getAll(); 

      this.animalRef = firebase.database().ref('/animais');

        this.animalRef.on('value', animalList => { 
          let animais = []; 
          animalList.forEach( animal => {
            animais.push(animal.val());
            return false;
          }); 

          this.animalList = animais; 
          this.loadeadAnimalList = animais;
      });
  }

  initializeItems(){
    this.animalList = this.loadeadAnimalList;
  }

  getItems(searchbar){
    //Redefinir itens de volta para todos os itens
    this.initializeItems();
    
    //definir q como valor do searchbar
    var q = searchbar.srcElement.value;

    // se o valor for uma string vazia não filtrar
    if(!q){
      return;
    }

    this.animalList = this.animalList.filter((v)=> {
      if(v.statusPedido && q) {
        if (v.statusPedido.toLowerCase().indexOf(q.toLowerCase()) > -1){
          return true
        }
        return false;
      }
    });

    console.log(q, this.animalList.length);
  }


  showConfirm(animal){
    const confirm = this.alertCtrl.create({
      title: 'Confirmar arquivamento',
      message: 'Você deseja arquivar este registro? Lembrando que uma vez arquivado não se pode mais restaurar!',
      buttons: [
        {
          text: 'Discordo',
          handler: () => {
            console.log('Discordo escolhido');
          }
        },
        {
          text: 'Concordo',
          handler: () => {
            //  função para deletar registro 
            this.firebaseService.delete(animal).then(d => {
              this.toastrService.show('Registro excluído com sucesso!', 3000).present();
                this.navCtrl.setRoot(ListPage);
            })
          }
        }
      ]
    });
    confirm.present();
  }

  editar(animal){
      this.navCtrl.push(EditPage,{
          'animal': animal
      });
  }



}

  