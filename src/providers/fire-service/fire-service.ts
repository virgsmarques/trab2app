import { Injectable } from '@angular/core';
import {AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

 // Provider utilizado para centralizar a lógica do CRUD

@Injectable()
export class FirebaseServiceProvider {
  private dbRef; // simplificar

  constructor(public db: AngularFireDatabase) {
      this.dbRef = this.db.list('animais');
  }

  save(animal: any){
   return this.dbRef
        .push(animal);
  }

  // listando registro do firebase
  getAll(){
    return this.dbRef.snapshotChanges().map(data =>{
      return data.map(d => ({key: d.key, ...d.payload.val()}));
      
    });
  }

  // atualizando registro do firebase
  update(animal){
    return this.dbRef
          .update(animal.key, animal);
          
  }

  // deletando registro do firebase
  delete(animal){
     return this.dbRef
        .remove(animal.key);
  }

}
