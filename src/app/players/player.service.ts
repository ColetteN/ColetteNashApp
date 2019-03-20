import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

/////////////Player and Database Service///////////////////////////////
@Injectable()
export class PlayerService {

  constructor(private firebaseDB:AngularFirestore) { }

  /////////////////Functions////////////////////////////////

//testing the  DB
// getAllDocs(){
//   return this.firebaseDB.collection("players").snapshotChanges();
// }

//Functions to handle communication with the database

  getPlayers(){
    return this.firebaseDB.collection("players").snapshotChanges();
  }

  public addPlayer(player){
    this.firebaseDB.collection("players").add(player);
  }

  deletePlayer(id){
    this.firebaseDB.doc("players/"+id).delete();
  }

  public updatePlayer(id, player) {
    this.firebaseDB.doc("players/"+id).update(player);
  }


}
