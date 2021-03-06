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
  public animais = [];
  public qtd : number;
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
      this.animalRef = firebase.database().ref('/animais');

        this.animalRef.on('value', animalList => { 
          let animais = []; 
          animalList.forEach(animal => {
            animais.push({key: animal.key, ...animal.val()});
            return false;
          }); 


          animais.map(a => this.setAnimalPhoto(a));
          console.log(animais);

          this.animalList = animais.filter(a => a.statusPedido != 'Arquivado'); 
          this.loadeadAnimalList = animais.filter(a => a.statusPedido != 'Arquivado');
          this.qtd = this.animalList.length;
      });
  }

  initializeItems(){
    this.animalList = this.loadeadAnimalList;
  }

  arquivar(animal){
    animal.statusPedido = 'Arquivado';
    this.firebaseService.update(animal).then(d => {
      this.toastrService.show('Animal arquivado com sucesso!', 3000).present();
    });
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
      if(v.statusPedido && q && !v.arquivado) {
        if (v.statusPedido.toLowerCase().indexOf(q.toLowerCase()) > -1){
          return true
        }
        return false;
      }
    });

    console.log(q, this.animalList.length);
  }

  setAnimalPhoto(animal){
    return firebase.storage().ref('/image/' + animal.key).getDownloadURL().then(response => {
      animal.foto = response
      console.log(animal);
    });
  }


  editar(animal){
      this.navCtrl.push(EditPage,{
          'animal': animal
      });
  }
}

  