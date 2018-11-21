import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public animais = [];
  public qtdTotal : number; // numero total de registros 
  qtdPendente : number = 0;
  qtdAtendido : number = 0;
  qtdArquivados : number = 0;

  public animalList: Array<any>; // Is to store the list of animals we’re pulling from Firebase.
  public loadeadAnimalList: Array<any>; 
  public animalRef:firebase.database.Reference; // criação de referencia para puxar do firebase

  constructor(public navCtrl: NavController, private push: Push) {

    this.animalRef = firebase.database().ref('/animais');

        this.animalRef.on('value', animalList => { 
          let animais = []; 
          animalList.forEach(animal => {
            animais.push({key: animal.key, ...animal.val()});
            return false;
          }); 


          this.animalList = animais; 
          this.loadeadAnimalList = animais;
          this.qtdArquivados = animais.filter(a => a.statusPedido == 'Arquivado').length;
          this.qtdTotal = animalList.numChildren();

          this.animalList.forEach(animal => {
            if(animal.statusPedido == 'Atendido'){
              this.qtdAtendido++;
            }
            if (animal.statusPedido == 'Pendente'){
              this.qtdPendente++;
            }
          })
      });
    
  }

}
