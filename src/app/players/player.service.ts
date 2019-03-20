import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iPlayer } from '../players/player';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

/////////////Player and Database Service///////////////////////////////
@Injectable()
export class PlayerService {

  //this will be bypassed by the InMemoryDataService
  private webURI:string = 'api/players';

  private httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient, private firebaseDB:AngularFirestore) { 
    console.log('HttpDemoService::constructor()');
  }


  /////////////////Functions////////////////////////////////

//test DB

getAllDocs(){
  return this.firebaseDB.collection("players").snapshotChanges();
}


  //HTTP GET to get many player items
  // : returns an observerable array of iPlayers
  public getPlayersOld():Observable<iPlayer[]>
  //send data down from server 
  {
    //the array of iPlayers
    return this.http.get<iPlayer[]>(this.webURI);
  }

  // public getPlayer(player:iPlayer):Observable<iPlayer>
  //Get one player only
  // {
  //   // The url needs to be in the form /api/players/:id
  //   let url:string = this.webURI + "/" + player.id;
  //   return this.http.get<iPlayer>(this.webURI, this.httpOptions);
  // }

  // HTTP POST to add a player
  public addPlayerOld(player: iPlayer): Observable<iPlayer> {
    return this.http.post<iPlayer>(this.webURI, player, this.httpOptions);
  }

  public addPlayer(player){
    return this.firebaseDB.collection("players").add(player);
  }

  // HTTP DELETE to delete a player
  public deletePlayer(player: iPlayer): Observable<iPlayer>  {
    // The url needs to be in the form /api/players/:id
    //webclient db uses a folder like structure, document db
    let url:string = this.webURI + "/" + player.id;
    return this.http.delete<iPlayer>(url, this.httpOptions);
    

  }

  // HTTP PUT to update a player
  public updatePlayer(player: iPlayer): Observable<iPlayer> {
    return this.http.put<iPlayer>(this.webURI, player, this.httpOptions);
  }


}
