import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public animais = [];
  public qtdTotal : number; // numero total de registros 

  public animalList: Array<any>; // Is to store the list of animals we’re pulling from Firebase.
  public loadeadAnimalList: Array<any>; 
  public animalRef:firebase.database.Reference; // criação de referencia para puxar do firebase

  constructor(public navCtrl: NavController) {

    this.animalRef = firebase.database().ref('/animais');

        this.animalRef.on('value', animalList => { 
          let animais = []; 
          animalList.forEach(animal => {
            animais.push({key: animal.key, ...animal.val()});
            return false;
          }); 


          this.animalList = animais; 
          this.loadeadAnimalList = animais;
          this.qtdTotal = animalList.numChildren();
          console.log(animalList.numChildren());
      });

  }

}
