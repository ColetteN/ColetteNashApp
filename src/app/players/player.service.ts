import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iPlayer } from '../players/player';
import { Observable } from 'rxjs';


@Injectable()
export class PlayerService {

  //this will be bypassed by the InMemoryDataService
  private webURI:string = 'api/players';

  private httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient) { 
    console.log('HttpDemoService::constructor()');
  }

  //HTTP GET to get many player items
  // : returns an observerable array of iPlayers
  public getPlayers():Observable<iPlayer[]>
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
  public addPlayer(player: iPlayer): Observable<iPlayer> {
    return this.http.post<iPlayer>(this.webURI, player, this.httpOptions);
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
